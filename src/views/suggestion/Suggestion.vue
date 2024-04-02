<template>
  <div>
    <div class="text-right mb-1">
      <b-button
        variant="primary"
        pill
        @click="createSuggestion"
        v-if="hasPermission('suggestion_create')"
      >
        <feather-icon icon="PlusIcon" class="mr-50" />
        <span class="align-middle">Create</span>
      </b-button>
    </div>
    <b-card>
      <b-table
        responsive="sm"
        :fields="fields"
        :items="suggestions"
        details-td-class="m-0 p-0"
        small
        v-if="hasPermission('suggestion_read')"
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
            @click="editSuggestion(row.item)"
            v-if="hasPermission('suggestion_update')"
          >
            Edit
          </b-button>
          <b-button
            variant="danger"
            pill
            size="sm"
            @click="removeSuggestion(row.item)"
            v-if="hasPermission('suggestion_delete')"
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
    <suggestion-create-modal
      @modalClosed="onModalClosed"
      :key="`create-${suggestionCreateModalCount}`"
    />
    <suggestion-edit-modal
      :suggestion="suggestion"
      @modalClosed="onModalClosed"
      :key="`edit-${suggestionEditModalCount}`"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SuggestionCreateModal from "@/components/suggestion/SuggestionCreateModal.vue";
import SuggestionEditModal from "@/components/suggestion/SuggestionEditModal.vue";
import util from "@/util.js";

export default {
  components: {
    SuggestionCreateModal,
    SuggestionEditModal,
  },
  data() {
    return {
      fields: [
        { key: "text", label: "Text" },
        { key: "created_at", label: "Created At" },
        { key: "created_by_data", label: "Created By" },
        { key: "updated_by_data", label: "Updated By" },
        { key: "manage", label: "Manage" },
      ],
      currentPage: 1,
      perPage: 0,
      totalItems: 0,
      suggestions: [],
      suggestion: null,
      suggestionCreateModalCount: 0,
      suggestionEditModalCount: 0,
    };
  },
  mixins: [util],
  async mounted() {
    await this.fetchPaginatedData();
  },
  methods: {
    ...mapActions({
      getSuggestions: "appData/getSuggestions",
      deleteSuggestion: "appData/deleteSuggestion",
    }),
    async fetchPaginatedData() {
      try {
        const res = await this.getSuggestions({
          pageNumber: this.currentPage,
        });
        this.suggestions = res.data.results;
        this.totalItems = res.data.count;
        this.perPage = res.data.per_page;
      } catch (error) {
        this.displayError(error);
      }
    },
    createSuggestion() {
      this.suggestionCreateModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("suggestion-create-modal");
      });
    },
    editSuggestion(suggestion) {
      this.suggestion = suggestion;
      this.suggestionEditModalCount += 1;
      this.$nextTick(() => {
        this.$bvModal.show("suggestion-edit-modal");
      });
    },
    async removeSuggestion(suggestion) {
      this.suggestion = suggestion;
      try {
        const res = await this.deleteSuggestion({
          pk: this.suggestion.id,
        });
        if (res.status === 204) {
          this.$swal({
            title: "Suggestion deleted successfully",
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
