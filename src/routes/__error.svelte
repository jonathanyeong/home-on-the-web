<div class="error-layout">
  <h1 class="title">OH NO!</h1>

  <p class="h4">This page doesn't exist! Here's a picture of my dog to make up for it</p>

  <div class="profile-img__container">
    <img alt="Albie being cute and sleepy" src="https://res.cloudinary.com/jonathan-yeong/image/upload/v1622253869/personal-blog/IMG_1133-Edit_a4quos.png" />
  </div>
</div>


<style lang="scss">
  .error-layout {
    text-align: center;
  }

  .profile-img__container {
    max-width: 50%;
    background-color: var(--heliotrope-gray);
    border-radius: 5px;
    margin: 0 auto;

    img {
      transform: translate(16px, -10px);
      border-radius: 5px;
      width: 100%;
    }
  }

  p.h4 {
    margin-bottom: 32px;
  }
</style>