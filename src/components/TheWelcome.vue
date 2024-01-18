<script setup lang="ts">
</script>

<template>
  <div class="welcome">
    <h1>Nicholas Crockett</h1>
    <p>Hello there! Welcome to my favorite work in progress. This app was built with <a href="https://vuejs.org/">Vue.js</a>. I have built the interactive console using typescript. For more information on this project, check out my GitHub repository <a href="https://github.com/nicholasccrockett/folio-app">here</a>.</p>
    <p>This project is mostly just a fun little test to make a simple little web app and portfolio. It's not perfect but it was fun to make!</p>
  </div>
</template>

<style>

p {
  padding-bottom: 1rem;
}

@media (min-width: 1024px) {
  .welcome {
    min-height:96vh;
    max-height: 99vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}</style>