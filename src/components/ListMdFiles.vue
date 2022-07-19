<template>
  <div>
    <div v-for="md in store.getListMdFiles()" :key="md.id" @click="loadMdFile(md)" style="display: flex" >
      <p class="listMD">{{ md.company }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { store } from "@/Store";
import {onMounted} from "vue";
import type { MD_File } from "@/Model/MD_File";
const URL_MD_API = import.meta.env.VITE_API_URL + "/api/md/";

onMounted(() => {
  if (store.listMdFiles.length === 0) {
    getMdFiles();
  }
});

function loadMdFile(md: MD_File) {
  store.setCurrentMD(md)
  console.log(store.getCurrentMD());
}

function getMdFiles() {
  axios.get(URL_MD_API).then((res) => {
    store.setListMdFiles(res.data);
  });
}
</script>

<style scoped>
.listMD {
  background-color: white;
  padding: 10px;
  color: grey;
  border-radius: 50rem;
}
</style>
