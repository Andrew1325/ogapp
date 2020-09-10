<template>
  <div class="navigation">
    <div class="navigation__logo" />
    <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
    <label for="navi-toggle" class="navigation__button">
      <span class="navigation__icon">&nbsp;</span>
    </label>

    <div class="navigation__background">&nbsp;</div>

    <nav class="navigation__nav">
      <ul class="navigation__list">
        <li class="navigation__item" v-for="item in items" :key="item.title" @click="uncheck">
          <nuxt-link @click="uncheck" :to="item.link" class="navigation__link">
            <i
              style="position:relative; margin-right: 2rem; top:5px;"
              class="navigation__link-i material-icons-outlined"
            >{{ item.icon }}</i>
            {{item.title}}
          </nuxt-link>
        </li>
        <li v-for="(item, i) in items2" :key="item.title" @click="uncheck">
          <nuxt-link
            :to="item.link"
            class="navigation__link"
            v-if="i === 0 && !user || i === 1 && !!user && user.permissions > 1 || i === 2 && !!user || i === 3 && !!user || i === 4 && !user"
          >
            <i
              style="position:relative; margin-right: 2rem; top:5px;"
              class="navigation__link-i material-icons-outlined"
            >{{ item.icon }}</i>
            {{item.title}}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  props: ["user"],
  data() {
    return {
      items: [
        { title: "Home", icon: "home", link: "/" },
        { title: "Events", icon: "event", link: "/events" },
        { title: "Shop", icon: "store", link: "/shop" },
        { title: "Blog", icon: "art_track", link: "/blog" },
        { title: "About", icon: "bubble_chart", link: "/about" }
      ],
      items2: [
        { title: "Login", icon: "fingerprint", link: "/signin" },
        { title: "Admin", icon: "settings", link: "/admin" },
        { title: "Logout", icon: "lock", link: "/signout" },
        { title: "Edit Details", icon: "account_circle", link: "/editself" },
        { title: "Signup", icon: "person_add", link: "/signup" }
      ],
      open: false,
      iconColor: "rgb(255, 255, 255)"
    };
  },
  methods: {
    navClicked() {
      let sheet = document.styleSheets[46]; //cssRules[14] & cssRules[15]
      let bef = sheet.cssRules[14].style;
      let af = sheet.cssRules[15].style;

      if (this.open) {
        console.log("closing ", this.iconColor);
        if (this.iconColor === "rgb(0, 0, 0)") {
          setTimeout(() => {
            bef.removeProperty("background-color");
            bef.setProperty("background-color", "rgb(0, 0,0)");
            af.removeProperty("background-color");
            af.setProperty("background-color", "rgb(0,0,0)");
          }, 400);
        }
        this.open = false;
      } else {
        this.iconColor = bef.backgroundColor;
        if (bef.backgroundColor === "rgb(255, 255, 255)") {
          console.log("no change");
        } else {
          bef.removeProperty("background-color");
          bef.setProperty("background-color", "rgb(255,255,255)");
          af.removeProperty("background-color");
          af.setProperty("background-color", "rgb(255,255,255)");
        }
        this.open = true;
      }
    },
    uncheck() {
      document.getElementById("navi-toggle").checked = false;
    }
  }
};
</script>


<style>
.navigation__logo {
  position: absolute;
  top: 40px;
  left: 40px;
  height: 110px;
  width: 76px;
  background-image: url("/goddessDeviceDev.svg");
  z-index: 23;
}

.navigation__checkbox {
  display: none;
}

.navigation__button {
  height: 4.5rem;
  width: 4.5rem;
  background-color: transparent;
  position: fixed;
  top: 3.5rem;
  right: 3.5rem;
  z-index: 1002;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

.navigation__background {
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  position: fixed;
  top: -6.5rem;
  right: -6.5rem;
  background-image: radial-gradient(#222, #666);
  z-index: 1000;
  transition: all 0.6s cubic-bezier(0.755, 0.2, 0.855, 0.06);
}

.navigation__nav {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1001;

  opacity: 0;
  width: 0;

  transition: all 0.4s 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.navigation__list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  width: 100%;
}

.navigation__item {
  margin: 1rem;
}

/* .navigation__link-i {
  position: absolute;
  left: 50%;
  transform: translateX(-4rem);
} */

.navigation__link:link,
.navigation__link:visited {
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 300;
  color: #fff !important;
  text-decoration: none;
  text-transform: uppercase;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.824) 50%
  );
  padding: 1.2rem 2.2rem;
  background-size: 252%;
  transition: all 0.4s;
}

.navigation__link:hover,
.navigation__link:active {
  background-position: 100%;
  color: #444 !important;
}

.navigation__checkbox:checked ~ .navigation__background {
  transform: scale(80);
}

.navigation__checkbox:checked ~ .navigation__nav {
  opacity: 1;
  width: 100%;
}

.navigation__icon {
  position: relative;
  margin-top: 3.5rem;
}
.navigation__icon,
.navigation__icon::before,
.navigation__icon::after {
  height: 1px;
  display: inline-block;
}

.navigation__icon::before,
.navigation__icon::after {
  content: "";
  position: absolute;
  left: 0;
  transition: all 0.2s;
}

.navigation__icon::before {
  width: 2.2rem;
  top: -0.8rem;
  background-color: #fff;
}

.navigation__icon::after {
  width: 1.1rem;
  top: 0rem;
  left: 1.1rem;
  background-color: #fff;
}

.navigation__button:hover .navigation__icon::before {
  width: 1.1rem;
  top: -0.8rem;
  left: 1.1rem;
}

.navigation__button:hover .navigation__icon::after {
  width: 2.2rem;
  top: 0rem;
  left: 0rem;
}

.navigation__checkbox:checked + .navigation__button .navigation__icon {
  background-color: transparent;
}

.navigation__checkbox:checked + .navigation__button .navigation__icon::before {
  top: 0;
  left: 0;
  width: 2rem;
  transform: rotate(135deg);
}

.navigation__checkbox:checked + .navigation__button .navigation__icon::after {
  top: 0;
  left: 0;
  width: 2rem;
  transform: rotate(-135deg);
}
</style>