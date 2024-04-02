<template>
  <b-modal
    id="user-edit-modal"
    title="User Edit Modal"
    centered
    hide-footer
    size="lg"
    @hidden="reset"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
  >
    <template #modal-title> <h2 class="m-0">Edit User</h2> </template>
    <validation-observer ref="userEditFormValidation">
      <b-form @submit.prevent>
        <b-row>
          <b-col>
            <VueSelectPaginated
              name="Role"
              label="name"
              rules="required"
              :prevSelected="selectedRole"
              :getMethod="getRole"
              :getListMethod="getRoles"
              @setMethod="
                (value) => {
                  selectedRole = value;
                }
              "
            />
          </b-col>
        </b-row>
        <b-form-group class="text-right">
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
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import util from "@/util.js";
import VueSelectPaginated from "@/components/ui/VueSelectPaginated.vue";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    VueSelectPaginated,
  },
  props: {
    user: Object,
  },
  mixins: [util],
  data() {
    return {
      required,
      email,
      username: "",
      emailValue: "",
      firstName: "",
      lastName: "",
      selectedRole: null,
      selectedDepartment: null,
    };
  },
  async mounted() {
    if (this.user) {
      this.selectedRole = this.user.role;
    }
  },
  methods: {
    ...mapActions({
      updateUser: "appData/updateUser",
      getRoles: "appData/getRoles",
      getRole: "appData/getRole",
    }),
    async validationForm() {
      const success = await this.$refs.userEditFormValidation.validate();
      if (success) {
        await this.submit();
      }
    },
    async submit() {
      try {
        const res = await this.updateUser({
          payload: {
            role: this.selectedRole.id,
          },
          pk: this.user.id,
        });
        if (res.status === 200) {
          this.$swal({
            title: "User updated successfully",
            icon: "success",
          });
          this.$nextTick(() => {
            this.$bvModal.hide("user-edit-modal");
          });
          this.$emit("modalClosed");
        }
      } catch (error) {
        this.displayError(error);
      }
    },
    reset() {
      this.name = "";
    },
  },
  computed: {
    ...mapGetters({ getLoggedInUser: "appData/getLoggedInUser" }),
  },
};
</script>

<style lang="scss">
.vSelectStyle .vs__deselect {
  fill: #fff !important;
}
</style>
