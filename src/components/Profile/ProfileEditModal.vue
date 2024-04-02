<template>
  <div v-if="modalCount > 0">
    <b-modal
      id="profile-edit-modal"
      title="Profile Update Modal"
      centered
      hide-footer
      size="lg"
      @hidden="reset"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
    >
      <template #modal-title>
        <h2 class="m-0">Update Profile</h2>
      </template>

      <validation-observer ref="ProfileEditValidation">
        <b-form @submit.prevent>
          <b-row>
            <b-col md="6">
              <b-form-group label="First Name" label-for="firstName">
                <validation-provider
                  #default="{ errors }"
                  name="Firstname"
                  rules="required|alpha"
                >
                  <b-form-input
                    id="firstName"
                    v-model="firstNameVal"
                    :state="errors.length > 0 ? false : null"
                    placeholder="User First Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Last Name" label-for="lastName">
                <validation-provider
                  #default="{ errors }"
                  name="lastName"
                  rules="required|alpha"
                >
                  <b-form-input
                    id="lastName"
                    v-model="lastNameVal"
                    :state="errors.length > 0 ? false : null"
                    placeholder="User Last Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Username" label-for="username">
                <validation-provider
                  #default="{ errors }"
                  name="username"
                  rules="required"
                >
                  <b-form-input
                    id="username"
                    v-model="usernameVal"
                    :state="errors.length > 0 ? false : null"
                    placeholder="username"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group class="text-right">
            <b-button
              type="submit"
              variant="primary"
              pill
              class="mr-1"
              @click="changePassword"
            >
              Change Password
            </b-button>
            <b-button
              type="submit"
              variant="primary"
              pill
              class="mr-1"
              @click="validationForm"
            >
              Update
            </b-button>
          </b-form-group>
        </b-form>
      </validation-observer>
      <b-overlay :show="show" spinner-variant="primary" no-wrap />
    </b-modal>
    <change-password-modal
      :key="`createe-${changePasswordModalCount}`"
      @modalClosed="onModalClosedPaswword"
    />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import util from "../../util";
import { mapActions, mapGetters } from "vuex";
import ChangePasswordModal from "@/components/Profile/ChangePasswordModal.vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ChangePasswordModal,
  },
  directives: {
    Ripple,
  },
  props: {
    modalCount: Number,
    firstName: String,
    lastName: String,
    username: String,
    id: Number,
  },
  mixins: [util],
  data() {
    return {
      changePasswordModalCount: 0,
      firstNameVal: null,
      lastNameVal: null,
      usernameVal: null,
      required,
      show: false,
    };
  },
  mounted() {
    if (this.modalCount > 0) {
      this.firstNameVal = this.firstName;
      this.lastNameVal = this.lastName;
      this.usernameVal = this.username;
    }
  },
  methods: {
    ...mapActions("appData", ["updateProfile", "updateCurrentUser"]),
    async validationForm() {
      const success = await this.$refs.ProfileEditValidation.validate();
      if (success) {
        await this.submit();
      }
    },

    async submit() {
      try {
        this.show = true;
        const res = await this.updateProfile({
          pk: this.id,
          first_name: this.firstNameVal,
          last_name: this.lastNameVal,
          username: this.usernameVal,
        });
        if (res.status === 200) {
          this.$swal({
            title: res.data.msg,
            icon: "success",
            timer: 1500,
          });
          await this.updateCurrentUser();
          this.show = false;
          this.reset();
          this.$nextTick(() => {
            this.$bvModal.hide("profile-edit-modal");
          });
          this.$emit("modalClosed");
        }
        this.show = false;
      } catch (error) {
        this.show = false;
        this.displayError(error);
      }
    },
    changePassword() {
      this.changePasswordModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("change-password-modal");
      });
    },
    onModalClosedPaswword() {
      try {
        // alert('test');
      } catch (error) {}
    },
    reset() {
      this.patientName = "";
      this.dateOfBirth = null;
      this.selectedRelation = null;
      this.selectedBloodGroup = null;
    },
  },
  computed: {
    staffRoles() {
      return this.roles.filter((role) => {
        if (role.code_name !== "pt" && role.code_name !== "doc") {
          return role;
        }
      });
    },
    ...mapGetters({
      getUser: "appData/getUser",
      hasRole: "appData/hasRole",
    }),
  },
};
</script>

<style>
.vSelectStyle .vs__deselect {
  fill: #fff !important;
}
</style>
