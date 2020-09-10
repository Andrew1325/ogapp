<template>
  <div id="quotes" class="capture capture2" v-if="quotes">
    <div class="capture__container">
      <div class="capture__container-item capture__heading">
        <h1>What women are saying</h1>
      </div>

      <div class="capture__container-item">
        <div class="one"></div>
        <img src="/goddessDeviceDevGrey.svg" alt />
        <br />
        <br />
        <p style="color: white;">
          <img src="/quotes.svg" height="34px" alt />
          <i>{{ quotes[0] }}</i>
        </p>
      </div>
      <div class="capture__container-item">
        <div class="two"></div>
        <img src="/mandalaGrey.svg" alt />
        <br />
        <br />
        <p style="color: white;">
          <i>{{ quotes[1] }}</i>
        </p>
      </div>
      <div class="capture__container-item">
        <div class="three"></div>
        <img src="/featherGrey.svg" alt />
        <br />
        <br />
        <p style="color: white;">
          <i>{{ quotes[3] }}</i>
          <img class="quote-rotate" src="/quotes.svg" height="34px" alt />
        </p>
      </div>
      <div class="capture__container-item capture__spacer"></div>
    </div>
  </div>

  <div id="capture" class="capture capture1" v-else>
    <div class="capture__container">
      <div class="capture__container-item">
        <div class="one"></div>
        <div class="one"></div>
        <div class="one"></div>
        <div class="capture__image"></div>
        <!-- <p>
          Do you feel as though you give so much of your time and energy to
          others that you have none left for yourself?
        </p>
        <p>
          Do you have a deep longing for true sisterhood and nourishing
          connection with like-minded women?
        </p>-->
      </div>
      <div class="capture__container-item two-span">
        <div class="two"></div>
        <p>
          <span class="large-cap">D</span>o you feel as though you give so much of your time and energy to
          others that you have none left for yourself?
        </p>
        <br />
        <p>
          <span class="large-cap">D</span>o you have a deep longing for true sisterhood and nourishing
          connection with like-minded women?
        </p>
        <br />
        <p>
          <span class="large-cap">D</span>o you want to spend time in a space where nobody needs anything
          from you; to reconnect with yourself, replenish your soul, and
          return to your life feeling lighter, stronger, and sovereign?
        </p>
        <br />
        <p>
          <span class="large-cap">A</span>re you ready to go on a journey of shared + personal discovery and
          transformation?
        </p>
        <br />
        <p>
          <span class="large-cap">W</span>ould it feel good to be truly seen + heard without judgement,
          supported unconditionally, and loved for exactly who you are?
        </p>
        <br />
        <p>
          <span class="large-cap">I</span>f you answered yes to ANY of these questions, then an Ordinary
          Goddess Retreat is for YOU.
        </p>
      </div>
      <!-- <div class="capture__container-item">
        <div class="three"></div>
       
      </div>-->

      <div class="capture__container-item capture__button">
        <div class="one"></div>
        <v-btn nuxt to="/events" class="capture__button-btn" outline>I want to know more</v-btn>
      </div>
      <div class="capture__container-item capture__spacer"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["quotes"]
};
</script>

<style>
.capture {
  box-sizing: border-box;
  width: 100vw;
}
.capture1 {
  background-color: white;
}
.capture1 p {
  color: #222;
}
.capture2 p {
  color: #eee;
}
.capture2 {
  background-color: black;
}
.capture__container {
  max-width: 1200px;
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  padding: 10px 0;
  margin: 0 auto;
}
.capture__container-item {
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
.two-span {
  grid-column: 2 / 4;
  grid-row: 1;
}
.capture__container-item > p {
  font-size: 1.7rem;
  font-weight: 400;
}
.large-cap {
  font-size: 2.5rem;
  font-weight: 700;
}
.capture__container-item > img {
  height: 76px;
}
.capture__image {
  background-image: url("/featherGrey.svg");
  height: 100%;
  width: 100%;
}
.capture__button {
  grid-column: 1 / 4;
  grid-row: 2;
}
.capture__spacer {
  grid-column: 1 / 4;
  grid-row: 3;
  height: 6rem;
}
.capture__heading {
  grid-column: 1 / 4;
  grid-row: 1;
}
.capture__heading > h1 {
  font-size: 2.4rem;
  line-height: 8rem;
}
.one {
  height: 60px;
}
.two {
  height: 120px;
}
.three {
  height: 180px;
}
.capture__button-btn {
  text-align: center;
  font-weight: 300;
  font-size: 1.6rem;
  padding: 1.6rem 2.6rem;
}
.quote-rotate {
  transform: rotate(180deg);
  position: absolute;
  margin: 8px 16px;
}

@media (max-width: 990px) {
  .capture {
    padding: 20px 0;
  }
  .capture__container {
    grid-template-columns: 1fr;
    padding: 10px;
    margin: 0 auto;
  }
  .capture__container-item {
    padding: 4vh 10vw;
  }
  .capture__image {
    height: 0%;
    width: 0%;
  }
  .two-span {
    grid-column: 1;
    grid-row: 1;
  }
  .capture__button {
    grid-column: 1;
    grid-row: 4;
  }
  .capture__spacer {
    grid-column: 1;
    grid-row: 5;
    height: 0rem;
  }
  .capture__heading {
    grid-column: 1;
    grid-row: 1;
  }
  .one,
  .two,
  .three {
    height: 0px;
  }
}
</style>


