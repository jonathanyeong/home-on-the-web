<script>
  import MailIcon from '$lib/icons/MailIcon.svelte';
  import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
  import YoutubeIcon from '$lib/icons/YoutubeIcon.svelte';
</script>

<svelte:head>
	<title>Jonathan Yeong | About Me</title>
</svelte:head>

<h1 class="title">About Me</h1>
<div class="row">
  <div class="col">
    <div class="profile-img__container">
      <img src="https://res.cloudinary.com/jonathan-yeong/image/upload/v1622474271/personal-blog/profile_pic_minified_svw9cq.jpg" alt="jonathan yeong profile" class="profile-img"/>
    </div>
  </div>
  <div class="col first-section">
    <h2>Who am I? What is this site?</h2>
    <p>
      I’m a senior developer at Shopify, originally from Australia, currently living in Seattle. This site is my digital garden, filled with a mix of half-baked ideas.
      And more rarely, concrete articles. It’s inspired by Maggie Appleton, who did an amazing dive into the <a href="https://maggieappleton.com/garden-history" target="_blank" rel="noopener">history of digital gardens</a>.
      Highly recommend reading it! In my garden, I write about a variety topics around being a developer. With technical articles focused around Ruby, Elixir, Javascript, and their respective ecosystems.
      While I love exploring new things, I’m a Rubyist at heart.
  </div>
</div>
<div class="row">
  <div class="col second-section">
    <h2>Ruby on Rails & Community</h2>
    <p>
      I got my start in web development using Ruby on Rails in 2015. It was the first time I’ve used Ruby, my first framework, and my first web application. The learning curve was steep. I remember following a tutorial, early on, where I created a blog. My first thought was, “this shit is magic”. My second thought was, “I’m so screwed if anything breaks”.
      Being on the only other developer at that company, I struggled. I should’ve asked more questions than I did, but the huge reason I was able to push through was because of community. During that time I joined the Ruby and CodeNewbie community, I finally felt like I belonged. It was a place to share wins and struggles with others at a similar stage.
      This experience has shaped how I view being a programmer. Continually learning, connecting with, and teaching others is what I find most rewarding.
    </p>

    <p>
      I hope you enjoy the articles on this site! If you want to put a voice behind these words.
      I’ve also started a <a href="https://www.youtube.com/c/jonathanyeong" rel="noopener noreferrer nofollow" target="_blank">YouTube channel</a>,
      where I upload in-depth tutorials and general developer advice. Feel free to connect with me on <a href="https://twitter.com/JonoYeong" rel="noopener noreferrer nofollow" target="_blank">Twitter</a>,
      or find me kicking around in the <a href="https://virtualcoffee.io/" rel="noopener" target="_blank">Virtual Coffee community</a>.
    </p>

    <h2>Speaker Bio</h2>
    <p>
      Jonathan Yeong is a senior developer at Shopify. Being from Australia, he often goes by Jono. A Rubyist at heart, he blogs and produces videos about all things programming. He’s passionate about the human connections in technology. And believes that being part of a community, a mentor, and a teacher is one of the most rewarding things you can do.
    </p>

    <h2>Most Recent Talk</h2>
    <p><a href="https://www.youtube.com/watch?v=iNbqpT0elbA&list=PL2yVnDETvO-pXF_Twt2I-lY9-1VratInb&index=1" target="_blank" rel="noopener noreferrer nofollow">Elixir Conf 2020 - Deep Dive into Elixir</a></p>
  </div>
</div>

<style lang="scss">
  a {
		text-decoration: none;
		color: var(--body-text-color);
    font-family: var(--font-family-heavy);
		transition: color 0.05s ease-in;

		&:hover {
			color: var(--link-hover-color);
		}
	}

  p {
    margin-top: 0;
  }

  .row {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .profile-img__container {
    background-color: var(--primary-200);
    border-radius: 5px;
    img {
      transform: translate(16px, -10px);
      border-radius: 5px;
      max-width: 100%;
    }
  }

  .col:first-child {
    margin-bottom: 16px;
    margin-right: 16px;

    @media (min-width: 768px) {
      margin-right: 16px;
    }
  }
  .col:last-child {
    @media (min-width: 768px) {
      margin-left: 16px;
    }

    &.first-section {
      @media (min-width: 768px) {
        margin-left: 32px;
      }
   }
  }
</style>