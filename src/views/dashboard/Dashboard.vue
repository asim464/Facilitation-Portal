<template>
  <div>
    <b-row>
      <b-col xl="2" md="4" sm="6" v-if="hasRole('su')">
        <b-link @click="exportPetitions">
          <b-card class="text-center">
            <b-avatar class="mb-1" variant="light-info" size="45">
              <feather-icon size="21" icon="FileIcon" />
            </b-avatar>
            <div class="truncate">
              <h4 class="mb-25 font-weight-bolder">Upload File to Apps</h4>
            </div>
          </b-card>
        </b-link>
      </b-col>
      <b-col xl="2" md="4" sm="6" v-if="hasRole('su')">
        <b-link @click="downloadPetition">
          <b-card class="text-center">
            <b-avatar class="mb-1" variant="light-info" size="45">
              <feather-icon size="21" icon="FilePlusIcon" />
            </b-avatar>
            <div class="truncate">
              <h4 class="mb-25 font-weight-bolder">Download from Apps</h4>
            </div>
          </b-card>
        </b-link>
      </b-col>
    </b-row>
    <petition-download-modal
      @modalClosed="onModalCloseddownload"
      :key="`download-${petitionDownloadModalCount}`"
    />
    <petition-upload-modal
      @modalClosed="onModalClosedUpload"
      :key="`upload-${petitionDownloadModalCount}`"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import util from "@/util.js";
import axios from "axios";
import PetitionDownloadModal from "@/components/petition/PetitionDownloadModal.vue";
import PetitionUploadModal from "@/components/petition/PetitionuploadModal.vue";
export default {
  data() {
    return {
      petitionDownloadModalCount: 0,
      petitionuploadModalCount: 0,
    };
  },
  components: {
    PetitionDownloadModal,
    PetitionUploadModal,
  },
  mixins: [util],
  methods: {
    ...mapActions({
      downloadPetitionToFile: "appData/downloadPetitionToFile",
      downloadFileByPath: "appData/downloadFileByPath",
    }),
    createPetition() {
      this.petitionCreateModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("petition-create-modal");
      });
    },
    downloadPetition() {
      this.petitionDownloadModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("petition-download-modal");
      });
    },
    onModalClosedImport() {
      this.$bvModal.hide("petition-import-modal");
    },
    async exportPetitions() {
      this.petitionuploadModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("petition-upload-modal");
      });
      // try {
      //   const res = await this.downloadPetitionToFile({
      //     is_downloaded: false,
      //     draft: false,
      //   });
      //   await this.downloadFile(res);
      // } catch (e) {
      //   this.displayError(e);
      //   console.log(e);
      // }
    },
    async downloadFile(res) {
      const file_path =
        "http://localhost:8000" + res.data.data.split("backend")[1];
      let temp_path_arr = file_path.split("\\");
      const file_name = temp_path_arr[temp_path_arr.length - 1];
      const res2 = await axios({
        method: "GET",
        responseType: "blob",
        url: file_path,
      });
      const file = window.URL.createObjectURL(new Blob([res2.data]));
      let link = document.createElement("a");
      link.href = file;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      this.$swal({
        title: res.data.msg,
        icon: "success",
        timer: 1500,
      });
    },

    onModalCloseddownload() {
      this.$bvModal.hide("petition-download-modal");
    },
    onModalClosedUpload() {
      this.$bvModal.hide("petition-upload-modal");
    },
  },
  computed: {
    ...mapGetters({
      hasRole: "appData/hasRole",
      getLoggedInUser: "appData/getLoggedInUser",
    }),
  },
};
</script>

<style></style>
