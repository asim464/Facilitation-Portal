<template>
  <div style="height: 5%">
    <div
      class="d-flex justify-content-center align-items-center h-100 bg-primary"
    >
      <b-link
        class="text-white my-nav-item my-nav-link d-flex align-items-center"
        :to="{ name: 'Petition' }"
        v-if="hasPermission('petition_show')"
      >
        <feather-icon icon="HomeIcon" size="16" class="mr-50 text-white" />
        <span>Home</span>
      </b-link>
      
      <b-link
        class="
          text-white
          my-nav-item my-nav-link
          d-flex
          align-items-center
          ml-2
        "
        :to="{ name: 'User' }"
        v-if="hasPermission('user_show')"
      >
        <feather-icon icon="UserIcon" size="16" class="mr-50 text-white" />
        <span>USER</span>
      </b-link>

      <b-link
        class="
          text-white
          my-nav-item my-nav-link
          d-flex
          align-items-center
          ml-2
        "
        :to="{ name: 'Role' }"
        v-if="hasPermission('role_show')"
      >
        <feather-icon icon="UsersIcon" size="16" class="mr-50 text-white" />
        <span>ROLE</span>
      </b-link>

      <!-- <b-link
        class="
          text-white
          my-nav-item my-nav-link
          d-flex
          align-items-center
          ml-2
        "
        :to="{ name: 'Organization' }"
        v-if="hasPermission('organization_show')"
      >
        <feather-icon icon="BoxIcon" size="16" class="mr-50 text-white" />
        <span>ORGANIZATION</span>
      </b-link> -->

      <!-- <b-link
        class="
          text-white
          my-nav-item my-nav-link
          d-flex
          align-items-center
          ml-2
        "
        :to="{ name: 'Petition' }"
        v-if="hasPermission('petition_show')"
      >
        <feather-icon icon="FileIcon" size="16" class="mr-50 text-white" />
        <span>RFA</span>
      </b-link> -->

      <!-- <b-link
        class="
          text-white
          my-nav-item my-nav-link
          d-flex
          align-items-center
          ml-2
        "
        :to="{ name: 'MarkedPetition' }"
        v-if="hasPermission('marked_petition_show')"
      >
        <feather-icon icon="FileIcon" size="16" class="mr-50 text-white" />
        <span>MARKED RFA</span>
      </b-link> -->

      <!-- <b-link
        class="
          text-white
          my-nav-item my-nav-link
          d-flex
          align-items-center
          ml-2
        "
        :to="{ name: 'AllPetition' }"
        v-if="hasPermission('all_petition_show')"
      >
        <feather-icon icon="FileIcon" size="16" class="mr-50 text-white" />
        <span>ALL RFA</span>
      </b-link> -->

      <!-- <b-dropdown
        text="Reports"
        class="m-0 p-0 ml-2"
        variant="primary"
        size="sm"
        v-if="
          hasPermission('daily_report_show') ||
          hasPermission('overall_report_show')
        "
      >
        <template #button-content>
          <feather-icon icon="FileIcon" size="15" class="mr-50 text-white" />
          Reports
        </template>
        <b-dropdown-item
          v-if="hasPermission('daily_report_show')"
          :to="{ name: 'Daily' }"
          >Daily</b-dropdown-item
        >
        <b-dropdown-item
          v-if="hasPermission('overall_report_show')"
          :to="{ name: 'Overall' }"
          >Overall</b-dropdown-item
        >
      </b-dropdown> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      hasPermission: "appData/hasPermission",
      getLoggedInUser: "appData/getLoggedInUser",
    }),
  },
};
</script>

<style></style>
