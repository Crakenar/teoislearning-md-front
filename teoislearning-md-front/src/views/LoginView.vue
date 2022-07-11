<template>
  <div v-if="!store.authenticated" id="login">
    <h1>Login</h1>
    <div class="form">
      <input
        v-model="input.username.value"
        name="username"
        placeholder="Username"
        type="text"
      />
      <input
        v-model="input.password.value"
        name="password"
        placeholder="Password"
        type="password"
      />
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../assets/Store";
import router from "../router";

const input = {
  username: ref(""),
  password: ref(""),
};

function login() {
  if (input.username.value !== "" && input.password.value !== "") {
    if (
      input.username.value === store.mockAccount.username &&
      input.password.value === store.mockAccount.password
    ) {
      store.setAuthenticated(true);
      router.replace({ name: "mdpreview" });
    } else {
      console.log("The username and / or password is incorrect");
    }
  } else {
    console.log("A username and password must be present");
  }
}
</script>

<style scoped>
#login {
  text-align: center;
}

.form {
  display: inline-grid;
  background-color: white;
  padding: 10px;
}

.form > * {
  padding: 5px;
  margin: 4px;
}
</style>
