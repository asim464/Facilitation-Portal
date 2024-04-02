<template>
  <div style="height: 82%" class="bg-light py-50 px-50">
    <b-row class="h-100" no-gutters>

      <b-col cols="3" class="h-100">

        <b-row class="h-50" no-gutters>
          <b-col cols="12">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body class="p-50">
                Body
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

        <b-row class="h-25 pt-50" no-gutters>
          <b-col cols="12">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body class="p-50">
                Body
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

        <b-row class="h-25 pt-50" no-gutters>
          <b-col cols="12">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body class="p-50"> 
                Body
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

      </b-col>

      <b-col cols="6" class="h-100 pl-50 pr-50">

        <b-row style="height: 30%" no-gutters>

          <b-col cols="4" class="h-100">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body>
                <b-row class="h-100">
                  
                  <b-col md="6" class="text-center h-100">
                    <b-avatar size="30" variant="success" class="mb-50">
                      <feather-icon
                        size="16"
                        icon="FileIcon"
                        class="cursor-pointer"
                      />
                    </b-avatar>
                    <p class="font-weight-bolder m-0 text-success my-font-size">
                      Title
                    </p>
                    <p class="m-0 font-weight-bolder text-success">
                      Data here
                    </p>
                  </b-col>

                  <b-col md="6" class="text-center h-100">
                    <b-avatar size="30" variant="warning" class="mb-50">
                      <feather-icon
                        size="16"
                        icon="FileIcon"
                        class="cursor-pointer"
                      />
                    </b-avatar>
                    <p class="font-weight-bolder m-0 text-warning my-font-size">
                      Title
                    </p>
                    <p class="m-0 font-weight-bolder text-warning">
                      Data here
                    </p>
                  </b-col>

                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col cols="4" class="h-100 px-50">

            <b-row class="h-50" no-gutters>
              <b-card
                no-body
                class="h-100 m-0 w-100 cursor-pointer"
              >
                <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                  Title
                </p>
                <b-card-body class="py-50">
                  <p class="m-0 text-danger text-center font-weight-bolder">
                    Data
                  </p>
                </b-card-body>
              </b-card>
            </b-row>

            <b-row class="h-50 pt-50" no-gutters>
              <b-card
                no-body
                class="h-100 m-0 w-100 cursor-pointer"
              >
                <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                  Title
                </p>
                <b-card-body class="py-50">
                  <p class="m-0 text-danger text-center font-weight-bolder">
                    Data
                  </p>
                </b-card-body>
              </b-card>
            </b-row>

          </b-col>

          <b-col cols="4" class="h-100">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body>
                <b-row class="h-100">

                  <b-col md="6" class="text-center h-100">
                    <b-avatar size="30" variant="success" class="mb-50">
                      <feather-icon
                        size="16"
                        icon="FileIcon"
                        class="cursor-pointer"
                      />
                    </b-avatar>
                    <p class="font-weight-bolder m-0 text-success my-font-size">
                      Title
                    </p>
                    <p class="m-0 font-weight-bolder text-success">
                      Data
                    </p>
                  </b-col>

                  <b-col md="6" class="text-center h-100">
                    <b-avatar size="30" variant="warning" class="mb-50">
                      <feather-icon
                        size="16"
                        icon="FileIcon"
                        class="cursor-pointer"
                      />
                    </b-avatar>
                    <p class="font-weight-bolder m-0 text-warning my-font-size">
                      Title
                    </p>
                    <p class="m-0 font-weight-bolder text-warning">
                      Data
                    </p>
                  </b-col>

                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

        </b-row>

        <b-row style="height: 70%" class="pt-50">

          <b-col cols="12" class="h-100">
            <b-card no-body class="h-100 m-0 p-50">
              
              <b-row no-gutters align-v="center">
                
                <b-col md="9" class="px-50">
                  <swiper
                    class="swiper-centered-slides-2 mx-3"
                    :options="swiperOptions"
                    :slides-per-view="3"
                  >
                    <swiper-slide class="rounded swiper-shadow">
                      <b-button
                        variant="primary"
                        pill
                        size="sm"
                        >Button</b-button
                      >
                    </swiper-slide>
                    <swiper-slide class="rounded swiper-shadow">
                      <b-button
                        variant="primary"
                        pill
                        size="sm"
                        class="ml-50"
                        >Button</b-button
                      >
                    </swiper-slide>
                    <swiper-slide class="rounded swiper-shadow">
                      <b-button
                        variant="primary"
                        pill
                        size="sm"
                        class="ml-50"
                        >Button</b-button
                      >
                    </swiper-slide>
                    <swiper-slide class="rounded swiper-shadow">
                      <b-button
                        variant="primary"
                        pill
                        size="sm"
                        class="ml-50"
                        >Button</b-button
                      >
                    </swiper-slide>
                    <swiper-slide class="rounded swiper-shadow">
                      <b-button
                        variant="primary"
                        pill
                        size="sm"
                        class="ml-50"
                        >Button</b-button
                      >
                    </swiper-slide>
                    <swiper-slide class="rounded swiper-shadow">
                      <b-button
                        variant="primary"
                        pill
                        size="sm"
                        class="ml-50"
                        >Button</b-button
                      >
                    </swiper-slide>
                  </swiper>
                  <div slot="button-next" class="swiper-button-next" />
                  <div slot="button-prev" class="swiper-button-prev" />
                </b-col>

                <b-col cols="3" class="pl-50">
                  Graph filter(s) here    
                </b-col>

              </b-row>

              <b-row class="h-100" no-gutters>
                <b-col class="h-100">                  
                  <vue-apex-charts
                    type="line"
                    width="100%"
                    height="100%"
                    :key="noRFAPlotKey"
                    :options="noRFAPlotOptions"
                    :series="noRFAPlotSeries"
                    v-if="rfaPlot === 1"
                  /> 
                </b-col>
              </b-row>

            </b-card>
          </b-col>

        </b-row>
      </b-col>

      <b-col cols="3" class="h-100">
        <b-row class="h-50" no-gutters>
          <b-col cols="12">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body class="p-50"> 
                Body
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="h-50 pt-50" no-gutters>
          <b-col cols="12">
            <b-card no-body class="h-100 m-0">
              <p class="font-weight-bolder m-0 text-center w-100 mt-1">
                Title
              </p>
              <b-card-body class="p-50">
                <vue-perfect-scrollbar
                  :settings="perfectScrollbarSettings"
                  class="h-100"
                >
                Body
                </vue-perfect-scrollbar>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- ADD ANY POPUP COMPONENTS HERE TO SHOW USING ON-CLICK OR V-IF -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
import flatPickr from "vue-flatpickr-component";
import moment from "moment";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import util from "@/util.js";
import "swiper/css/swiper.css";

export default {
  components: {
    VueApexCharts,
    VuePerfectScrollbar,
    flatPickr,
    Swiper,
    SwiperSlide,
  },
  mixins: [util],
  data() {
    return {
      data: {},
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
        wheelPropagation: false,
        useBothWheelAxes: false,
        suppressScrollX: true,
      },
      swiperOptions: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      rangeDate: `${moment(new Date())
        .subtract(5, "d")
        .format("YYYY-MM-DD")} to ${moment(new Date())
        .add(5, "d")
        .format("YYYY-MM-DD")}`,
      startDate: moment(new Date()).subtract(5, "d").format("YYYY-MM-DD"),
      endDate: moment(new Date()).add(5, "d").format("YYYY-MM-DD"),
      noRFAPlotSeries: [
        {
          data: [],
        },
      ],
      noRFAPlotOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        markers: {
          strokeWidth: 7,
          strokeOpacity: 1,
          strokeColors: [$themeColors.light],
          colors: [$themeColors.warning],
        },
        colors: [$themeColors.warning],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        tooltip: {
          custom(data) {
            return `${'<div class="px-1 py-50"><span>'}${
              data.series[data.seriesIndex][data.dataPointIndex]
            }</span></div>`;
          },
        },
        xaxis: {
          categories: [],
        },
      },
      dirRFADtePlotSeries: [
        {
          data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
        },
      ],
      dirRFADtePlotOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        stroke: {
          show: true,
          colors: ["transparent"],
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        },
      },
      todayRFARankPlotSeries: [
        {
          data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
        },
      ],
      todayRFARankPlotOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        stroke: {
          show: true,
          colors: ["transparent"],
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        },
      },
      overallRFARankPlotSeries: [
        {
          data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
        },
      ],
      overallRFARankPlotOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        stroke: {
          show: true,
          colors: ["transparent"],
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        },
      },
      rfaCatPlotSeries: [
        {
          data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
        },
      ],
      rfaCatPlotOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        stroke: {
          show: true,
          colors: ["transparent"],
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        },
      },
      rfaTypePlotSeries: [
        {
          data: [99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
        },
      ],
      rfaTypePlotOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        stroke: {
          show: true,
          colors: ["transparent"],
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        },
      },
      filter: {},
      petitionShowModalCount: 0,
      todayIsServing: true,
      overallIsServing: true,
      isTodayRFACat: true,
      isTodayRFAType: true,
      rfaPlot: 1,
      noRFAPlotKey: 1,
      dirRFADtePlotKey: 1,
      todayRFARankPlotKey: 1,
      overallRFARankPlotKey: 1,
      rfaCatPlotKey: 1,
      rfaTypePlotKey: 1,
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
  },
  // async mounted() {
  //   await this.dashboardData();
  //   await this.noOfRFAPlot();
  //   await this.dirRFAByDtePlot();
  //   await this.todayRFARankPlot();
  //   await this.overallRFARankPlot();
  //   await this.rfaCatPlot();
  //   await this.rfaTypePlot();
  // },
  methods: {
    // ...mapActions({
    //   getDashboardData: "appData/getDashboardData",
    //   getNoOfRFAPlot: "appData/getNoOfRFAPlot",
    //   getDirRFAByDtePlot: "appData/getDirRFAByDtePlot",
    //   getTodayRFARankPlot: "appData/getTodayRFARankPlot",
    //   getOverallRFARankPlot: "appData/getOverallRFARankPlot",
    //   getRFACatPlot: "appData/getRFACatPlot",
    //   getRFATypePlot: "appData/getRFATypePlot",
    // }),
    // showPetition({
    //   today_closed_petition,
    //   today_process_petition,
    //   exceed_by_7_days,
    //   overall_closed_petition,
    //   overall_process_petition,
    //   type,
    //   isServing,
    //   category,
    //   exceed_by_24_hrs,
    // }) {
    //   this.filter = {};
    //   if (today_closed_petition) {
    //     this.filter.status = this.petitionStatus.CLOSED;
    //     this.filter.created_at = moment(new Date()).format("YYYY-MM-DD");
    //   }
    //   if (today_process_petition) {
    //     this.filter.status = this.petitionStatus.PROCESSING;
    //     this.filter.created_at = moment(new Date()).format("YYYY-MM-DD");
    //   }
    //   if (exceed_by_7_days) {
    //     this.filter.exceed_by_7_days = moment(new Date()).format("YYYY-MM-DD");
    //   }
    //   if (exceed_by_24_hrs) {
    //     this.filter.exceed_by_24_hrs = moment(new Date()).format("YYYY-MM-DD");
    //   }
    //   if (overall_closed_petition) {
    //     this.filter.status = this.petitionStatus.CLOSED;
    //   }
    //   if (overall_process_petition) {
    //     this.filter.status = this.petitionStatus.PROCESSING;
    //   }
    //   if (type) {
    //     this.filter.type = type;
    //   }
    //   if (isServing !== undefined) {
    //     this.filter.is_serving = isServing;
    //   }
    //   if (category) {
    //     this.filter.category = category;
    //   }
    //   this.petitionShowModalCount += 1;
    //   this.$nextTick(() => {
    //     this.$bvModal.show("petition-show-modal");
    //   });
    // },
    // async dashboardData() {
    //   try {
    //     const res = await this.getDashboardData();
    //     this.data = res.data;
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
    // async onDateChange(range) {
    //   if (range.length > 1) {
    //     this.startDate = moment(range[0]).format("YYYY-MM-DD");
    //     this.endDate = moment(range[1]).format("YYYY-MM-DD");

    //     await this.noOfRFAPlot();
    //   }
    // },
    // async noOfRFAPlot() {
    //   try {
    //     const res = await this.getNoOfRFAPlot({
    //       start_date: this.startDate,
    //       end_date: this.endDate,
    //     });

    //     const cat = [];

    //     let stDate = this.startDate;
    //     while (moment(stDate).format("YYYY-MM-DD") <= this.endDate) {
    //       cat.push(`${moment(stDate).date()} ${moment(stDate).format("MMMM")}`);
    //       stDate = moment(stDate).add(1, "d").format("YYYY-MM-DD");
    //     }

    //     this.noRFAPlotOptions = {
    //       ...this.noRFAPlotOptions,
    //       xaxis: {
    //         categories: cat,
    //       },
    //     };
    //     this.noRFAPlotSeries = [
    //       {
    //         data: res.data.petitions,
    //       },
    //     ];
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
    // async dirRFAByDtePlot() {
    //   try {
    //     const res = await this.getDirRFAByDtePlot({
    //       date: this.date,
    //     });

    //     this.dirRFADtePlotOptions = {
    //       ...this.dirRFADtePlotOptions,
    //       xaxis: {
    //         categories: res.data.organizations,
    //       },
    //     };
    //     this.dirRFADtePlotSeries = [
    //       {
    //         data: res.data.count,
    //       },
    //     ];
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
    // async todayRFARankPlot(e) {
    //   try {
    //     const res = await this.getTodayRFARankPlot({
    //       isServing: this.todayIsServing,
    //     });

    //     this.todayRFARankPlotOptions = {
    //       ...this.todayRFARankPlotOptions,
    //       xaxis: {
    //         categories: res.data.rank_types,
    //       },
    //       colors: ["#5cb85c", "#f0ad4e"],
    //     };
    //     this.todayRFARankPlotSeries = [
    //       {
    //         name: "In Process",
    //         data: res.data.process_petition,
    //       },
    //       {
    //         name: "Closed",
    //         data: res.data.closed_petition,
    //       },
    //     ];
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
    // async overallRFARankPlot(e) {
    //   try {
    //     const res = await this.getOverallRFARankPlot({
    //       isServing: this.todayIsServing,
    //     });

    //     this.overallRFARankPlotOptions = {
    //       ...this.overallRFARankPlotOptions,
    //       xaxis: {
    //         categories: res.data.rank_types,
    //       },
    //       colors: ["#5cb85c", "#f0ad4e"],
    //     };
    //     this.overallRFARankPlotSeries = [
    //       {
    //         name: "In Process",
    //         data: res.data.process_petition,
    //       },
    //       {
    //         name: "Closed",
    //         data: res.data.closed_petition,
    //       },
    //     ];
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
    // async rfaCatPlot(e) {
    //   try {
    //     const res = await this.getRFACatPlot({
    //       isToday: this.isTodayRFACat,
    //     });

    //     this.rfaCatPlotOptions = {
    //       ...this.rfaCatPlotOptions,
    //       xaxis: {
    //         categories: res.data.category_types,
    //       },
    //       colors: ["#5cb85c", "#f0ad4e"],
    //     };
    //     this.rfaCatPlotSeries = [
    //       {
    //         name: "In Process",
    //         data: res.data.process_petition,
    //       },
    //       {
    //         name: "Closed",
    //         data: res.data.closed_petition,
    //       },
    //     ];
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
    // async rfaTypePlot(e) {
    //   try {
    //     const res = await this.getRFATypePlot({
    //       isToday: this.isTodayRFAType,
    //     });

    //     this.rfaTypePlotOptions = {
    //       ...this.rfaTypePlotOptions,
    //       xaxis: {
    //         categories: res.data.petition_types,
    //       },
    //       colors: ["#5cb85c", "#f0ad4e"],
    //     };
    //     this.rfaTypePlotSeries = [
    //       {
    //         name: "In Process",
    //         data: res.data.process_petition,
    //       },
    //       {
    //         name: "Closed",
    //         data: res.data.closed_petition,
    //       },
    //     ];
    //   } catch (error) {
    //     this.displayError(error);
    //   }
    // },
  },
  computed: {
    ...mapGetters({
      hasPermission: "appData/hasPermission",
      getLoggedInUser: "appData/getLoggedInUser",
    }),
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/swiper.scss";
</style>
