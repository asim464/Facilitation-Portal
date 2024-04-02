<template>
  <b-modal
    id="petition-upload-modal"
    title="Upload Application Data"
    centered
    hide-footer
    size="lg"
    @hidden="reset"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
  >
    <template #modal-title>
      <h2 class="m-0">Upload Application Data</h2>
    </template>
    <validation-observer ref="petitionUploadFormValidation">
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
              placeholder="Select Application to upload file to"
              label="text"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-form-group label="Attachments" label-for="attachments">
          <b-form-file
            id="attachments"
            placeholder="Choose files or drop them here..."
            drop-placeholder="Drop file here..."
            multiple
            v-model="uploadedFiles"
            :accept="acceptedFileTypes"
          />
        </b-form-group>
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
import { quillEditor } from "vue-quill-editor";
import util from "@/util.js";
import axios from "axios";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    quillEditor,
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
      uploadedFiles: [],
      acceptedFileTypes: ".docx, .xlsx, .csv",
    };
  },
  methods: {
    ...mapActions({
      uploadPetitionApplicationData: "appData/uploadPetitionApplicationData",
    }),
    async validationForm() {
      const success = await this.$refs.petitionUploadFormValidation.validate();
      if (success) {
        let invalidType = false;
        for (let i = 0; i < this.uploadedFiles.length; i++) {
          if (
            this.acceptedFileTypes.indexOf(
              this.uploadedFiles[i].name.split(".")[1]
            ) < 0
          ) {
            invalidType = true;
            break;
          }
        }
        if (!invalidType) {
          await this.submit();
        }
      }
    },
    async submit() {
      try {
        let formData = new FormData();
        this.uploadedFiles.map((file, index) => {
          formData.append(`file${index}`, file);
        });
        let res = null;
        if (this.selectedApplication.value === "Petition") {
          res = await this.uploadPetitionApplicationData(formData);
        }
        if (res.status === 200) {
          await this.downloadFile(res);
        }
      } catch (error) {
        this.displayError(error);
        console.log("ERROR : ", error);
      }
      this.selectedApplication = null;
      this.uploadedFiles = [];
      this.$emit("modalClosed");
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
    reset() {},
  },
  computed: {
    ...mapGetters({ getUser: "appData/getUser" }),
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
