<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import Terminal from "../node_modules/xterm/lib/xterm.js";
// import HelloWorld from "./components/HelloWorld.vue";
import Portal from "./components/Portal.vue";
// import Program from "./components/Program.vue";

</script>

<template>
  <div class="funpanel">
    <div class="wrapper">
      <Portal class="Portal"/>
      <!-- <Program/> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>

template {
  display: flex;
  
}
.funpanel {
  line-height: 1.5;
  max-height: 99vh;
  justify-content: center;
}

footer {
  max-height: 1vh;
  justify-self: flex-end;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.Portal {
  
}

@media (min-width: 1024px) {
  .funpanel {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-direction: column;
    flex-wrap:nowrap;
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
