<template>
  <v-layout
    row wrap
    justify-center
    align-center
  >
    <v-flex xs12>
        <div class="cover-screen"></div>
        <div class="outer">
          <div class="middle">
            <div class="inner">
              <h1>Theme of 2019 - Seeding Change</h1><br>
              <p><i>“After all, what is more transformative than the female form? What is more a symbol of eternal growth and change than the Goddess? The eternal spiral of creation. Coiled like a serpent, our shakti energy sits, waiting to be awakened within all of us. What our bodies and beings were built for. What we were created to do. Change. Create. Create the change”</i><br><small>- Emma Milton</small></p><br>
              <h3>Seed. Germinate. Sprout. Grow. Blossom.</h3><br>
              <p>What changes would you like to seed in yourself? Your life? Your community? How would you like those aspects to look? What can you do to seed change in those areas?</p><br>
              <p><i>“If we don’t change, we don’t grow. If we don’t grow, we aren’t really living.”</i><br><small>- Gail Sheehy</small></p><br>
              <p>This year, join the Ordinary Goddesses on a journey through the seasons of growth and change, beginning with an introspective, intention-setting one day retreat at the beginning of Autumn. Plant the seeds of change, nourish them, and watch them grow with the support of your sisterhood.</p>
            </div>
          </div>
        </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .one {
   
  }
  .cover-screen {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width :100vw;
    background:linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url("/blurred-back.jpg");
    background-size: cover;
  }
  .outer {
    display: table;
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 36px 66px;
  }
  @media (max-width: 464px) {
    .outer {
      padding: 36px 36px;
    }
  }
  .middle {
    display: table-cell;
    vertical-align: middle;
  }
  .inner {
    background-color: rgba(66, 45, 66, 0.249);
    color: rgb(255, 255, 255);
    padding: 22px;
  }
  .inner >>> h1 {
    font-size: 3.2rem;
  }
  .inner >>> h3 {
    text-align: center;
    font-weight: 400;
    font-size: 1.9rem;
    line-height: 3.6rem;
  }
  .inner >>> p {
    font-size: 1.7rem;
    font-weight: 400;
  }
</style>