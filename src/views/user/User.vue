<template>
  <div>
    <b-card>
      <b-table
        responsive="sm"
        :fields="fields"
        :items="users"
        details-td-class="m-0 p-0"
        small
        v-if="hasPermission('user_read')"
        :per-page="0"
      >
        <template #cell(role_data)="row">
          {{ row.item.role_data.name }}
        </template>
        <template #cell(organization_data)="row">
          {{ row.item.organization_data.name }}
        </template>
        <template #cell(manage)="row">
          <b-button
            variant="info"
            pill
            size="sm"
            class="mr-1"
            @click="editUser(row.item)"
            v-if="hasPermission('user_update')"
          >
            Edit
          </b-button>
        </template>
      </b-table>
      <b-pagination
        size="md"
        :total-rows="totalItems"
        v-model="currentPage"
        :per-page="perPage"
      ></b-pagination>
    </b-card>
    <user-edit-modal
      :user="user"
      @modalClosed="onModalClosed"
      :key="`edit-${userEditModalCount}`"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserEditModal from "@/components/user/UserEditModal.vue";
import util from "@/util.js";

export default {
  components: {
    UserEditModal,
  },
  data() {
    return {
      fields: [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "rank_name", label: "Rank" },
        { key: "appointment_name", label: "Appointment" },
        { key: "role_data", label: "Role" },
        { key: "organization_data", label: "Organization" },
        { key: "manage", label: "Manage" },
      ],
      currentPage: 1,
      perPage: 0,
      totalItems: 0,
      users: [],
      user: null,
      userEditModalCount: 0,
    };
  },
  mixins: [util],
  async mounted() {
    await this.fetchPaginatedData();
  },
  methods: {
    ...mapActions({
      getUsers: "appData/getUsers",
    }),
    async fetchPaginatedData() {
      try {
        const res = await this.getUsers({
          pageNumber: this.currentPage,
        });
        this.users = res.data.results;
        this.totalItems = res.data.count;
        this.perPage = res.data.per_page;
      } catch (error) {
        this.displayError(error);
      }
    },
    editUser(user) {
      this.user = user;
      this.userEditModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("user-edit-modal");
      });
    },
    async onModalClosed() {
      await this.fetchPaginatedData();
    },
  },
  computed: {
    ...mapGetters({
      hasPermission: "appData/hasPermission",
    }),
  },
  watch: {
    currentPage: async function (val) {
      await this.fetchPaginatedData();
    },
  },
};
</script>

<style></style>
