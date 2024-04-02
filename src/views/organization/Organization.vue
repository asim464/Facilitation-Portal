<template>
  <div>
    <b-card>
      <b-table
        responsive="sm"
        :fields="fields"
        :items="organizations"
        details-td-class="m-0 p-0"
        small
        v-if="hasPermission('organization_read')"
        :per-page="0"
      >
        <template #cell(parent_data)="row">
          {{ row.item.parent_data ? row.item.parent_data.name : "Self" }}
        </template>
      </b-table>
      <b-pagination
        size="md"
        :total-rows="totalItems"
        v-model="currentPage"
        :per-page="perPage"
      ></b-pagination>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import util from "@/util.js";

export default {
  data() {
    return {
      fields: [
        { key: "name", label: "Name" },
        { key: "parent_data", label: "Parent" },
        { key: "organization_type", label: "Type" },
        { key: "location", label: "Location" },
      ],
      currentPage: 1,
      perPage: 0,
      totalItems: 0,
      organizations: [],
    };
  },
  mixins: [util],
  async mounted() {
    await this.fetchPaginatedData();
  },
  methods: {
    ...mapActions({
      getOrganizations: "appData/getOrganizations",
    }),
    async fetchPaginatedData() {
      try {
        const res = await this.getOrganizations({
          pageNumber: this.currentPage,
        });
        this.organizations = res.data.results;
        this.totalItems = res.data.count;
        this.perPage = res.data.per_page;
      } catch (error) {
        this.displayError(error);
      }
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
