import { reactive } from "vue";
import type {MD_File}  from "@/Model/MD_File";

export const store = reactive({
  listMdFiles: [] as MD_File[],
  currentMD: {} as MD_File,

  setListMdFiles(list: []) {
    this.listMdFiles = list;
  },
  getListMdFiles() {
    return this.listMdFiles;
  },
  getMdFileById(id: number) {
    return this.listMdFiles.find((md: MD_File) => md.id === id);
  },

  setCurrentMD(value: MD_File) {
    this.currentMD = value;
  },

  getCurrentMD() {
    return this.currentMD;
  },
});
