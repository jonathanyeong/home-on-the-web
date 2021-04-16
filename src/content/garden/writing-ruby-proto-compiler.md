---
date: 2019-09-12
title: "Building the Ruby Proto Compiler gem"
published: true
tags:
- tutorial
- ruby
---
[Protocol Buffers](https://developers.google.com/protocol-buffers/) (Protobufs) are a great way to pass information between your apps. Written by Google, Protobufs give you the readability of JSON but the structure of something like XML. Using the `protoc` tool you can compile the Protobufs into a language of your choosing.

One use case for Protobufs is defining a shared domain model. All the applications in your ecosystem will then use the shared Protobufs. However, this is a challenge with Ruby on Rails. Unlike Go, Ruby does not have a great way to import a shared protobuf library.

One way is to copy and paste the shared Protobuf repo into your Ruby on Rails codebase. Unfortunately, this means that every app will have to handle updating the Protobuf repo whenever there is a change. Instead of committing the entire Protobuf repo, we can instead commit only the compile Protobufs. This is where the `ruby_proto_compiler` gem comes in.

This gem contains a rake task that will pull down a versioned Protobuf repository, unpack it, compile the files, and include it in your Rails app. Here's a break down of the rake task and the design decisions I made.

## Breakdown of the Rake task

### Download Tar

Firstly, we need to download the archived Protobuf file from Github. Version matters, you have to have tagged your Protobuf repository. The `download_url` will be a Github link e.g: `https://github.com/jonathanyeong/2019-blog/archive/1.0.0.tar.gz`. The `dest_folder` is where you want to place your downloaded tar file.

```ruby
  task :download_tar, [:dest_folder, :download_url] do |t, args|
    begin
      Zlib::GzipWriter.open(args[:dest_folder]) do |local_file|
        open(args[:download_url]) do |remote_file|
          puts "Downloading TAR: #{args[:download_url]}"
          local_file.write(Zlib::GzipReader.new(remote_file).read)
        end
      end
    rescue OpenURI::HTTPError => e
      File.delete(args[:dest_folder])
      abort "Error: downloading tar with this URL: #{args[:download_url]} caused this error: #{e}"
    end
    puts "Succesfully download the TAR file found here: #{args[:dest_folder]}"
  end
```

### Unpack Tar

This is largely copied from [another blog post](http://dracoater.blogspot.com/2013/10/extracting-files-from-targz-with-ruby.html). The biggest change is setting the `unzipped_folder` instance variable. This will be used later to tell `protoc` where to find the Protobufs.

```ruby
  task :unzip, [:tar_path] do |t, args|
    puts "Unzipping tar at #{args[:tar_path]}"
    unzipped_folders = []

    Gem::Package::TarReader.new( Zlib::GzipReader.open(args[:tar_path])) do |tar|
      dest = nil
      tar.each do |entry|
        if entry.full_name == TAR_LONGLINK
          dest = File.join(DEFAULT_DOWNLOAD_DIR, entry.read.strip)
          next
        end
        dest ||= File.join DEFAULT_DOWNLOAD_DIR, entry.full_name
        if entry.directory?
          unzipped_folders << dest.gsub('tmp/', '')
          FileUtils.rm_rf dest unless File.directory? dest
          FileUtils.mkdir_p dest, :mode => entry.header.mode, :verbose => false
        elsif entry.file?
          FileUtils.rm_rf dest unless File.file? dest
          File.open dest, "wb" do |f|
            f.print entry.read
          end
          FileUtils.chmod entry.header.mode, dest, :verbose => false
        elsif entry.header.typeflag == '2' #Symlink!
          File.symlink entry.header.linkname, dest
        end
        dest = nil
      end
    end
    puts "Finished unzipping tar at #{args[:tar_path]}"
    @unzipped_folder = unzipped_folders.first.chomp('/')
  end
```

### Compile Protos

This hooks into your system to run the `protoc` tool. It will find the Protobufs using the `@unzipped_folder` variable and compile them to whatever your `args[:output_dir]` is.

```ruby
  task :compile_protos, [:output_dir] do |t, args|
    puts 'Generating Protos'
    FileUtils.mkdir_p(args[:output_dir])
    system("protoc tmp/#{@unzipped_folder}/*/*.proto --ruby_out=#{args[:output_dir]} -I tmp/#{@unzipped_folder}")
  end
```

### Require compiled Protos (if Rails)

In Rails you will need to include the compiled Protobuf files when you load your app. This rake task will create a new initializer file and add the corresponding requires to your compiled Protobufs.

```ruby
task :include_protos, [:output_dir] do |t, args|
  puts "Adding initializers/protobufs.rb file"
  File.open(Rails.root.join('config/initializers/protobufs.rb'), 'w') do |f|
    f.puts('Dir["#{Rails.application.config.root}/' + "#{args[:output_dir]}" + '*/*.rb"].each { |file| require file }')
  end
end
```

### Putting it all together

The generate task is the entry point to the whole rake task. It will assign some defaults, do some simple input validation, and then call the components mentioned above.

```ruby
desc 'Generate the Protos'
task :generate, [:release, :github_archive_url, :output_dir] do |task, args|
  args.with_defaults(:output_dir => DEFAULT_OUTPUT_DIR)
  abort("Error: No Release Specified\n\n" + help_text) if args[:release].nil?
  abort("Error: wrong output folder format #{args[:output_dir]} requires trailing /") unless args[:output_dir][-1].eql?('/')


  destination_path = DEFAULT_DOWNLOAD_DIR + args[:release] + TAR_EXT
  download_url = args[:github_archive_url] + args[:release] + TAR_EXT

  Dir.mkdir(DEFAULT_DOWNLOAD_DIR) unless Dir.exist?(DEFAULT_DOWNLOAD_DIR)
  Rake::Task['ruby_proto_compiler:download_tar'].invoke(destination_path, download_url)
  Rake::Task['ruby_proto_compiler:unzip'].invoke(destination_path, download_url)
  Rake::Task['ruby_proto_compiler:compile_protos'].invoke(args[:output_dir])
  Rake::Task['ruby_proto_compiler:include_protos'].invoke(args[:output_dir]) if defined?(Rails)
end
```

## What's next

There's a lot of improvements that I could make:

- There's no validation on the URL - but if it fails then no tar folder is generated and the rake task stops.
- The help text format is pretty bad.
- I don't like how arguments are passed into a rake task. For example, if you have spaces between the arguments then it won't run. Ideally, I would use `OptParse` to have a more robust parsing function.
- The rake task itself is pretty messy. I'd invest more time figuring out how to make each task run individually.
- It'd be great to have a cleanup task. That will undo all the changes for you.

If you made it this far thanks for reading! Checkout the [Github project](https://github.com/jonathanyeong/ruby_proto_compiler) to learn more about the gem.