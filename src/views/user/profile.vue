<template>
  <div class="page">
    <h2 class="main-title">Профиль</h2>
    <section class="profile">
      <div class="profile__left">
        <article class="profile__name">
          <User-Img :src="{ img: user.img, name: user.name }" />
          <h3 class="title-default">{{ user.name }}</h3>
        </article>
        <article class="profile__main">
          <h3 class="title-default">Информация:</h3>
          <div class="profile__table">
            <table class="table">
              <tbody>
                <tr
                  v-for="(infoItem, i) in user.info"
                  :key="i"
                  class="table__line"
                >
                  <td class="table__cell table__cell_f">
                    {{ infoItem.nameRu }}
                  </td>
                  <td class="table__cell table__cell_l">
                    {{ infoItem.value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
      <article class="profile__static">
        <apexchart
          type="radialBar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </article>
    </section>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import UserImg from '@/components/ImgUser.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    UserImg,
    apexchart: VueApexCharts
  },

  data() {
    return {
      series: [27, 30, 17, 23],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: 'кол-во тасков',
                formatter: function(w) {
                  return w.config.series.reduce((acc, elem) => (acc += elem), 0)
                }
              }
            }
          }
        },
        labels: ['Июнь', 'Июль', 'Август', 'Сентябрь']
      }
    }
  },

  computed: {
    ...mapGetters('user', { user: 'getUserFullData' })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/pages/profile';
</style>
