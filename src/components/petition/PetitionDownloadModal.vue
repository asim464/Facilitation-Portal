<template>
  <b-modal
    id="petition-download-modal"
    title="Download Application Data"
    centered
    hide-footer
    size="lg"
    @hidden="reset"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
  >
    <template #modal-title>
      <h2 class="m-0">Download Application Data</h2>
    </template>
    <validation-observer ref="petitionDownloadFormValidation">
      <b-form @submit.prevent>
        <validation-provider
          #default="{ errors }"
          name="Application"
          rules="required"
        >
          <b-form-group
            label="Application"
            label-for="Application"
            :state="errors.length > 0 ? false : null"
          >
            <v-select
              id="Application"
              v-model="selectedApplication"
              :options="ApplicaitonOptions"
              placeholder="Select Application to download file for"
              label="text"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-form-group>
          <b-button
            type="reset"
            variant="outline-secondary"
            @click="reset"
            class="mr-1 float-right"
            pill
          >
            Reset
          </b-button>
          <b-button
            type="submit"
            variant="primary"
            pill
            class="mr-1 float-right"
            @click="validationForm"
          >
            Submit
          </b-button>
        </b-form-group>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import util from "@/util.js";
import axios from "axios";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  mixins: [util],
  data() {
    return {
      required,
      selectedApplication: null,
      ApplicaitonOptions: [
        {
          text: "Shuhada",
          value: "Shuhada",
        },
        {
          text: "Petition",
          value: "Petition",
        },
        {
          text: "NOC",
          value: "NOC",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      downloadPetitionApplicationData:
        "appData/downloadPetitionApplicationData",
    }),
    async validationForm() {
      const success =
        await this.$refs.petitionDownloadFormValidation.validate();
      if (success) {
        await this.submit();
      }
    },
    async submit() {
      try {
        if (this.selectedApplication.value === "Petition") {
          let res = await this.downloadPetitionApplicationData();
          if (res.status === 200) {
            this.selectedApplication = null;
            await this.downloadFile(res);
            this.$swal({
              title: res.data.msg,
              icon: "success",
              timer: 1500,
            });
          } else if (res.status === 402) {
            this.selectedApplication = null;
            this.$swal({
              title: res.data.msg,
              icon: "error",
              timer: 3000,
            });
          }
        }
      } catch (error) {
        this.displayError(error);
      }
      this.$emit("modalClosed");
    },
    reset() {},
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
  },
  computed: {
    ...mapGetters({ getUser: "appData/getUser" }),
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
