<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import Terminal from "../node_modules/xterm/lib/xterm.js";
// import HelloWorld from "./components/HelloWorld.vue";
import Portal from "./components/Portal.vue";
// import Program from "./components/Program.vue";
</script>

<script lang='ts'>
  export default {
    childInterface: {
      showTerm: () => {}
    },
    methods: {
      getChildInterface(childInterface) {
        this.$options.childInterface = childInterface;
      },
      showTerm() {
        console.log('pressed')
        this.$options.childinterface.showTerm();
      }
    }
  }
</script>

<template>
  <div class="funpanel">
    <div class="wrapper">
      <Portal class="Portal" @interface="getChildInterface"/>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <button class="terminalButton" v-on:Click="showTerm">Terminal</button>
      </nav>
    </div>
    <line></line>
  </div>
  <RouterView/>
</template>

<style scoped>
.funpanel {
  line-height: 1.5;
  max-height: 98vh;
  max-width: 98vw;
}

nav {
  min-width: 400px;
  font-size: 12px;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav button {
  width: 5em;
  style: none;
  color: #1f6bf0;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav button:hover {
  style: none;
  color: #1f6bf0;
  border: solid 2px;
  border-color: #0b2656;
  font-size: 1rem;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}


nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1040px ) {
  .funpanel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-direction: column-reverse;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
