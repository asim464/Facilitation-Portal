<template>
  <div>
    <b-card>
      <b-row>
        <b-col>
          <div class="text-right mt-1">
            <b-button
              type="submit"
              variant="primary"
              pill
              class="mr-1"
              @click="editProfile"
            >
              Edit Profile
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <div>
            <div class="mb-1">
              <div class="wrapper d-inline-block">
                <b-img :src="profileImage" rounded fluid alt="profile photo" />
              </div>
            </div>
            <div>
              <h2
                style="text-align: left"
                class="text-primary font-weight-bold text-center"
              >
                {{ firstName + " " + lastName }}
              </h2>
            </div>
          </div>
        </b-col>
        <b-col md="10">
          <b-row class="p-1">
            <b-col>
              <strong> Username :</strong>
            </b-col>
            <b-col>{{ username }}</b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <strong> Full Name :</strong>
            </b-col>
            <b-col>{{ firstName + " " + lastName }}</b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <strong> First Name :</strong>
            </b-col>
            <b-col>{{ firstName }}</b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <strong> Last Name :</strong>
            </b-col>
            <b-col>{{ lastName }}</b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-overlay :show="show" spinner-variant="primary" no-wrap />
    </b-card>
    <profile-edit-modal
      :key="`edit-${editProfileModalCount}`"
      :modalCount="editProfileModalCount"
      @modalClosed="onModalClosed"
      :firstName="firstName"
      :lastName="lastName"
      :username="username"
      :id="id"
    />
  </div>
</template>

<script>
import util from "../../util";
import { mapGetters, mapActions } from "vuex";
import ProfileEditModal from "@/components/Profile/ProfileEditModal.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    ProfileEditModal,
  },
  mixins: [util],
  directives: {
    Ripple,
  },
  data() {
    return {
      editProfileModalCount: 0,
      profileImage: null,
      firstName: null,
      lastName: null,
      username: null,
      id: null,
      show: false,
    };
  },
  async mounted() {
    await this.getUserData();
  },
  methods: {
    ...mapActions({
      updateProfile: "appData/updateProfile",
    }),
    async getUserData() {
      this.profileImage = this.getUser.profile_image;
      this.firstName = this.getUser.first_name ? this.getUser.first_name : "";
      this.lastName = this.getUser.last_name ? this.getUser.last_name : "";
      this.username = this.getUser.username ? this.getUser.username : "";
      this.id = this.getUser.id;
    },
    editProfile() {
      this.editProfileModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("profile-edit-modal");
      });
    },

    async onModalClosed() {
      try {
        await this.getUserData();
      } catch (error) {
        this.displayError(error);
      }
    },
  },
  computed: {
    ...mapGetters({
      getUser: "appData/getLoggedInUser",
      hasRole: "appData/hasRole",
    }),
  },
};
</script>

<style>
.vSelectStyle .vs__deselect {
  fill: #fff !important;
}

[hidden] {
  display: none !important;
}

.wrapper {
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0px;
  text-align: center;
}
</style>
;
