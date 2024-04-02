<template>
  <div>
    <div class="text-right mb-1">
      <b-button
        variant="primary"
        pill
        @click="createRole"
        v-if="hasPermission('role_create')"
      >
        <feather-icon icon="PlusIcon" class="mr-50" />
        <span class="align-middle">Create</span>
      </b-button>
    </div>
    <b-card>
      <b-table
        responsive="sm"
        :fields="fields"
        :items="roles"
        details-td-class="m-0 p-0"
        small
        v-if="hasPermission('role_read')"
        :per-page="0"
      >
        <template #cell(created_by_data)="row">
          {{
            row.item.created_by_data ? row.item.created_by_data.username : ""
          }}
        </template>
        <template #cell(updated_by_data)="row">
          {{
            row.item.updated_by_data ? row.item.updated_by_data.username : ""
          }}
        </template>
        <template #cell(manage)="row">
          <b-button
            variant="info"
            pill
            size="sm"
            class="mr-1"
            @click="editRole(row.item)"
            v-if="hasPermission('role_update')"
          >
            Edit
          </b-button>
          <b-button
            variant="danger"
            pill
            size="sm"
            @click="removeRole(row.item)"
            v-if="hasPermission('role_delete')"
          >
            Delete
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
    <role-create-modal
      @modalClosed="onModalClosed"
      :key="`create-${roleCreateModalCount}`"
    />
    <role-edit-modal
      :role="role"
      @modalClosed="onModalClosed"
      :key="`edit-${roleEditModalCount}`"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RoleCreateModal from "@/components/role/RoleCreateModal.vue";
import RoleEditModal from "@/components/role/RoleEditModal.vue";
import util from "@/util.js";

export default {
  components: {
    RoleCreateModal,
    RoleEditModal,
  },
  data() {
    return {
      fields: [
        { key: "name", label: "Name" },
        { key: "created_at", label: "Created At" },
        { key: "created_by_data", label: "Created By" },
        { key: "updated_at", label: "Updated At" },
        { key: "updated_by_data", label: "Updated By" },
        { key: "manage", label: "Manage" },
      ],
      currentPage: 1,
      perPage: 0,
      totalItems: 0,
      roles: [],
      role: null,
      roleCreateModalCount: 0,
      roleEditModalCount: 0,
    };
  },
  mixins: [util],
  async mounted() {
    await this.fetchPaginatedData();
  },
  methods: {
    ...mapActions({
      getRoles: "appData/getRoles",
      deleteRole: "appData/deleteRole",
    }),
    async fetchPaginatedData() {
      try {
        const res = await this.getRoles({
          pageNumber: this.currentPage,
        });
        this.roles = res.data.results;
        this.totalItems = res.data.count;
        this.perPage = res.data.per_page;
      } catch (error) {
        this.displayError(error);
      }
    },
    createRole() {
      this.roleCreateModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("role-create-modal");
      });
    },
    editRole(role) {
      this.role = role;
      this.roleEditModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("role-edit-modal");
      });
    },
    async removeRole(role) {
      this.role = role;
      try {
        const res = await this.deleteRole({
          pk: this.role.id,
        });
        if (res.status === 204) {
          this.$swal({
            title: "Role deleted successfully",
            icon: "success",
          });
          if (
            (this.totalItems - 1) % this.perPage === 0 &&
            this.currentPage !== 1
          ) {
            this.currentPage -= 1;
          } else {
            await this.fetchPaginatedData();
          }
        }
      } catch (error) {
        this.displayError(error);
      }
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
