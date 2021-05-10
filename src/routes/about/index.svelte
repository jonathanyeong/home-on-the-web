<h1 class="title">About Me</h1>
<div class="row">
  <div class="col">
    <div class="profile-img__container">
      <img src="https://res.cloudinary.com/jonathan-yeong/image/upload/v1596067022/personal-blog/profile_pic_alznjm.jpg" alt="jonathan yeong" class="profile-img"/>
    </div>
  </div>
  <div class="col first-section">
    <h2>Hi There!</h2>

    <p>
      My name is Jonathan, I'm a software engineer originally from Australia, currently based in the United States.
    </p>
    <p>
      My web development career started with Ruby and Ruby on Rails. Previously, I was an iOS developer, and learning Ruby/Rails made
      me appreciate the focus on developer experience. The time it took to get a web app up and running blew my mind! But I
      quickly succumbed to the flexibility and lack of guard rails (heh). I remember for one of my early projects, I leaned into
      nested resources. Maybe a little too hard. The app became incredibly hard to debug and eventually I abandoned it and started again.
    </p>
  </div>
</div>
<div class="row">
  <div class="col second-section">
    <h2>What I'm up to now</h2>
    <p>
      Since that time, I worked at a digital agency, freelanced, and moved to the US to work at a fin-tech company.
      Most recently I worked at Highspot, a sales enablement startup. I strive to deliver maintainable solutions to products
      at scale. I love mentoring and contributing to the growth of the team around me.
    </p>
    <p>
      This website is where I'll write about Elixir, Ruby, JavaScript, and other thoughts on web development. I also
      have a newsletter and a YouTube channel where I dive into developer growth and processes.
    </p>
  </div>
  <div class="col connect-with-me">
    <h2>Connect with me</h2>
    <ul>
      <li><a href="mailto:hello@jonathanyeong.com">Email</a></li>
      <li><a href="https://twitter.com/jonoyeong">Twitter</a></li>
      <li><a href="https://www.youtube.com/channel/UClb6km0HLkGUOEjHlp5WdPA">Youtube</a></li>
    </ul>
  </div>
</div>

<style lang="scss">
  h1 {
    color: var(--primary-400);
  }
  .row {
    display: flex;
  }

  .profile-img__container {
    background-color: var(--secondary-100);
    border-radius: 5px;
    img {
      transform: translate(16px, -10px);
      border-radius: 5px;
      max-width: 100%;
    }
  }

  .col:first-child {
    margin-right: 16px;
  }
  .col:last-child {
    margin-left: 16px;
    &.first-section {
     margin-left: 32px;
   }
  }

  .second-section {
    flex: 3;
  }

  .connect-with-me {
    flex: 1;
  }
</style>