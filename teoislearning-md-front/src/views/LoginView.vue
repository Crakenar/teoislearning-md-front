<template>
  <div v-if="!store.authenticated" id="login">
    <h1>Login</h1>
    <div class="form">
      <form>
        <div class="form-group">
          <input
            v-model="form.username"
            name="username"
            placeholder="Username"
            type="text"
          />
        </div>
        <div class="form-group">
          <input
            v-model="form.password"
            name="password"
            placeholder="Password"
            type="password"
          />
        </div>
        <button type="button" v-on:click="login()">Login</button>
        <p v-if="resStatus !== 200 && resStatus !== 0">Wrong username of password</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../assets/Store";
import axios from "axios";
import router from "../router";

const resStatus = ref(0);

const form = ref({
  password: "",
  username: "",
});

async function login() {
  console.log(import.meta.env.VITE_API_URL);
  resStatus.value = 0;
  axios.post(import.meta.env.VITE_API_URL + "/api/authentication", form.value, {
    headers: {
      // remove headers
    }
  }).then((res) => {
    if (res.status === 200) {
      resStatus.value = 200;
      store.setAuthenticated(true);
      router.replace({ name: "mdpreview" });
    }
  }).catch(() => {
    resStatus.value = 404;
  });
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
p {
  color: red;
}
</style>
