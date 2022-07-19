<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import { store } from "@/assets/Store";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";


onMounted(() => {
  if (!store.authenticated) {
    router.replace({ name: "login" });
  }
});
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="Welcome to teoislearning-md !" />
      <nav>
        <RouterLink
          v-if="store.authenticated"
          to="/login"
          v-on:click.native="store.logout()"
          replace
          >Logout</RouterLink
        >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="store.authenticated" to="/mdpreview"
          >MD Editor</RouterLink
        >
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
body {
  display: flex;
  place-items: center;
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active:hover {
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


</style>
