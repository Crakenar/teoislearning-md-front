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
      <textarea id="" v-model="form.descriptionMD" cols="30" name="" rows="10"></textarea>
    </div>
    <div>
      <span>PREVIEW IN HTML</span>
      <div id="preview" v-html="markdownToHTML"></div>
    </div>

    <div class="btn-type">
      <form v-on:submit.prevent="sendMD">
        <div>
          <label for="title">Title</label>
          <input id="title" v-model="form.title" name="title" type="text" />
        </div>
        <div>
          <label for="date">Date</label>
          <input id="date" v-model="form.date_work" name="date" type="text" />
        </div>
        <div>
          <label for="date">Company</label>
          <input id="date" v-model="form.company" name="company" type="text" />
        </div>
        <div>
          <label for="date">Duration</label>
          <input id="date" v-model="form.duration" name="duration" type="text" />
        </div>
        <div>
          <label for="date">Image Path</label>
          <input id="date" v-model="form.imgPath" name="imgPath" type="text" />
        </div>
        <div>
          <label for="experiences">Experiences</label>
          <input
              id="experiences"
              v-model="form.typeMD"
              name="type"
              type="radio"
              value="experiences"
          />
        </div>
        <div>
          <label for="experiences">FR</label>
          <input
              id="fr"
              v-model="form.language"
              name="language"
              type="radio"
              value="fr"
          />
          <label for="experiences">EN</label>
          <input
              id="en"
              v-model="form.language"
              name="language"
              type="radio"
              value="en"
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
    <div>
      <ListMdFiles/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListMdFiles from "@/components/ListMdFiles.vue";
import type {MD_File} from "@/Model/MD_File";
import {store} from "@/Store";

import {computed, ref, watchEffect} from "vue";
import {marked} from 'marked'
import axios from "axios";

const URL_MD_API = import.meta.env.VITE_API_URL + '/api/md';
const tipsActive = ref<boolean>(false);

const form = ref({
  typeMD: "",
  descriptionMD: "",
  title: "",
  date_work: "",
  language: "",
  company: "",
  duration: "",
  imgPath: "",
  id: null,
});

const markdownToHTML = computed(() => {
  if (form.value.descriptionMD) {
    return marked(form.value.descriptionMD);
  } else {
    return marked('# Entrez votre markdown');
  }
});

function sendMD() {
  const currentMD:MD_File = store.getCurrentMD();
  form.value.id = currentMD.id ? currentMD.id : null;
  console.log(form.value);
  axios.post(URL_MD_API, form.value)
      .then((res) => {
        console.log('post completed successfully',res)
      })
}

watchEffect(() => {
  const currentMD:MD_File = store.getCurrentMD();
  if (currentMD) {
    form.value.id = currentMD.id ? currentMD.id : null;
    form.value.title = currentMD.title;
    form.value.descriptionMD = currentMD.descriptionMD;
    form.value.typeMD = currentMD.typeMD;
    form.value.date_work = currentMD.date_work;
    form.value.language = currentMD.language;
    form.value.company = currentMD.company;
  }

});
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
