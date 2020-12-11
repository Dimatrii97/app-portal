<template>
  <div class="home-page page">
    <section class="chart">
      <h2 class="main-title">Продажи</h2>
      <div class="chart__canvas substrate">
        <apexcharts
          :series="series"
          :options="chartOptions"
          type="bar"
          height="100%"
        />
      </div>
    </section>
    <section class="news">
      <h2 class="main-title">Новости</h2>
      <div>
        <div class="news__list">
          <The-News-Card
            v-for="(newsItem, i) in getNews"
            :news="newsItem"
            :key="i"
            class="news__item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheNewsCard from "@/components/home/HomeCard";
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";

export default {
  components: {
    TheNewsCard,
    apexcharts: VueApexCharts
  },
  data: function() {
    return {
      chartOptions: {
        colors: ["#05e6ff", "#004182", "#288fb4"],
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: ["Июнь", "Июль", "Август", "Сентябрь"],
          tooltip: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        }
      },

      series: [
        {
          name: "1 неделя",
          data: [19, 24, 41, 13]
        },
        {
          name: "2 неделя",
          data: [33, 12, 35, 16]
        },
        {
          name: "3 неделя",
          data: [23, 30, 15, 19]
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("setNews");
  },
  computed: {
    ...mapGetters(["getNews"])
  }
};
</script>
<style lang="scss">
@import "@/assets/pages/home";
</style>
