---
date: 2017-01-04
title: "Setting Up RSpec and FactoryGirl"
published: true
tags:
- tutorial
- rspec
---
Not another RSpec tutorial! I know, there’s plenty of well written tutorials out there. But, thankfully, this is only a cheat sheet. The article below outlines the steps to get RSpec and Factory girl set up in your Rails app. If you want a TL;DR, follow the code snippets and skip all the text.

***

First of all we need to add [rspec-rails](https://github.com/rspec/rspec-rails) and [factory_girl_rails](https://github.com/thoughtbot/factory_girl_rails) to the Gemfile.
```
    group :development, :test do
      gem 'rspec-rails', '~> 3.5'
      gem 'factory_girl_rails'
    end
```
Next run:
```
    $ bundle install
    $ rails generate rspec:install
```
This will generate a `spec/`  folder inside your application. You can remove the `test/`  folder if it exists.

Next create the file `spec/support/factory_girl.rb`  and paste in:
```
    # spec/support/factory_girl.rb
    RSpec.configure do |config|
      config.include FactoryGirl::Syntax::Methods
    end
```
This makes method calls less verbose. For example instead of `FactoryGirl.build`  you can now use `build`.

Next, uncomment the following line in `spec/rails_helper.rb`  to autoload files in the `support/`  directory.
```
    Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
```
Everything is now setup. The next step is to generate a test and create a factory. Then we need to make sure everything passes.

# Generating a test and running it

An RSpec test will be generated whenever you generate a model or controller. RSpec also offers generators to generate a test only. For example here’s how to generate a test for the model, Widget.
```
    rails generate rspec:model widget
```
Check the [RSpec documentation on generators](https://www.relishapp.com/rspec/rspec-rails/docs/generators) to learn more.

_Fun fact: with Factory Girl installed, a factory will also be generated when you generate a test._

Here are the files created when running the above RSpec generator. This should also generate a Factory Girl file `spec/factories/widgets.rb`.
```
    # spec/models/widget_spec.rb
    require 'rails_helper'
    RSpec.describe Widget, type: :model do
      pending "add some examples to (or delete) #{__FILE__}"
    end

    # spec/factories/widgets.rb
    FactoryGirl.define do
      factory :widget do
      end
    end
```
To run the test:
```
    bundle exec rspec spec
```
✅ RSpec + Factory Girl installation