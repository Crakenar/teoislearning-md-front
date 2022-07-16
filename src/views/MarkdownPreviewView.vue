<template>
  <div>
    <div>
      <button @click="tipsActive = !tipsActive">Tips md</button>
      <div v-if="tipsActive" class="tips">
        <h3>Tips pour ecrire un .md</h3>
        <br />
        <ul>
          <li># Pour les titres (# -> h1 ## -> h2)</li>
          <li>br Pour saut de ligne</li>
          <li>- Pour les . de listes</li>
        </ul>
      </div>
    </div>
    <div>
      <span>.MD Editor</span>
      <textarea id="" v-model="markdown" cols="30" name="" rows="10"></textarea>
    </div>
    <div>
      <span>PREVIEW IN HTML</span>
      <div id="preview" v-html="markdownToHTML"></div>
    </div>

    <div class="btn-type">
      <form v-on:submit.prevent="sendMD">
        <input
          v-model="form.type"
          type="radio"
          name="type"
          id="projects"
          value="projects"
        />
        <label for="projects">Projets</label>
        <input
          v-model="form.type"
          type="radio"
          name="type"
          id="experiences"
          value="experiences"
        />
        <label for="experiences">Experiences</label>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import {marked} from 'marked'
import axios from "axios";

const tipsActive = ref<boolean>(false);
const form = ref({
  type: "",
});

const markdown = ref("# Remplissez cet espace avec un style type '.md'");
const markdownToHTML = computed(() => {
  return marked(markdown.value);
});

function sendMD() {
  console.log(form.value);
  // axios.post('/markdownTOHTML', form.value)
  //     .then((res) => {
  //       console.log(res)
  //     }).catch((error) => {
  //       console.log(error)
  //     })
}
</script>

<style scoped>
div {
  padding: 10px;
}

.tips {
  background-color: white;
  color: brown;
}

div > textarea {
  width: 100%;
  resize: none;
}

#preview {
  background-color: white;
  color: black;
}

.btn-type {
  text-align: center;
}

form > label {
  padding: 10px;
}
</style>
