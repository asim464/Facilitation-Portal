<template>
  <b-modal
    id="change-password-modal"
    title="Password Change Modal"
    centered
    hide-footer
    size="lg"
    @hidden="reset"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
  >
    <template #modal-title>
      <h2 class="m-0">Change Password</h2>
    </template>

    <validation-observer ref="changePasswordValidation">
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="login-password">Old Password</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Old Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="login-password"
                    v-model="oldPasswordValue"
                    :state="errors.length > 0 ? false : null"
                    class="form-control-merge"
                    :type="passwordFieldType"
                    name="login-password"
                    placeholder="Old Password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group label="New Password" label-for="newPassword">
              <validation-provider
                #default="{ errors }"
                name="New Password"
                vid="Password"
                rules="required|min:3"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="newPassword"
                    v-model="newPasswordValue"
                    name="newPassword"
                    :type="passwordFieldType2"
                    :state="errors.length > 0 ? false : null"
                    placeholder="New Password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon2"
                      @click="togglePasswordVisibility2"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Confirm Password" label-for="c-password">
              <validation-provider
                #default="{ errors }"
                name="Password Confirm"
                rules="required|confirmed:Password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="c-password"
                    v-model="passwordCon"
                    :type="passwordFieldType3"
                    name="c-password"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Re-type Password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon3"
                      @click="togglePasswordVisibility3"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group class="text-right">
          <b-button
            type="reset"
            variant="outline-secondary"
            @click="reset"
            pill
          >
            Reset
          </b-button>
          <b-button
            style="margin-left: 3%"
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
  </b-modal>
</template>

<script>
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import util from "../../util";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility, util],
  data() {
    return {
      oldPasswordValue: "",
      newPasswordValue: "",
      passwordCon: "",
      passwordFieldType: "password",
      passwordFieldType2: "password",
      passwordFieldType3: "password",
    };
  },
  async mounted() {
    if (this.profile) {
    }
  },
  methods: {
    ...mapActions("appData", ["changePassword"]),
    async validationForm() {
      const success = await this.$refs.changePasswordValidation.validate();
      if (success) {
        await this.submit();
      }
    },
    togglePasswordVisibility2() {
      this.passwordFieldType2 =
        this.passwordFieldType2 === "password" ? "text" : "password";
    },
    togglePasswordVisibility3() {
      this.passwordFieldType3 =
        this.passwordFieldType3 === "password" ? "text" : "password";
    },
    async submit() {
      try {
        const res = await this.changePassword({
          old_password: this.oldPasswordValue,
          new_password: this.newPasswordValue,
          confirm_new: this.passwordCon,
        });
        if (res.status === 200) {
          this.$swal({
            title: res.data.msg,
            icon: "success",
            timer: 1500,
          });
          await this.reset();
          this.$nextTick(() => {
            this.$bvModal.hide("change-password-modal");
          });
          this.$emit("@modalClosed");
        }
        if (res.error === 400) {
          this.$swal({
            title: res.data.msg,
            icon: "error",
            timer: 3000,
          });
          await this.reset();
          this.$nextTick(() => {
            this.$bvModal.hide("change-password-modal");
          });
          this.$emit("@modalClosed");
        }
      } catch (error) {
        this.displayError(error);
      }
    },

    reset() {
      this.oldPasswordValue = "";
      this.newPasswordValue = "";
      this.passwordCon = "";
    },
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    passwordToggleIcon2() {
      return this.passwordFieldType2 === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    passwordToggleIcon3() {
      return this.passwordFieldType3 === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    ...mapGetters({
      hasPermission: "appData/hasPermission",
    }),
  },
};
</script>

<style>
.vSelectStyle .vs__deselect {
  fill: #fff !important;
}
</style>
