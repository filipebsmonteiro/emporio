<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Abertos" type="gradient-info" sub-title="5" icon="ni ni-active-40"/>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Confirmados" type="gradient-green" sub-title="20" icon="ni ni-check-bold"/>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Enviados" type="gradient-green" sub-title="12" icon="ni ni-delivery-fast"/>

        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Cancelados" type="gradient-danger" sub-title="3,65%" icon="fas fa-ban"/>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <div class="row">

        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Visão Geral</h6>
                <h5 class="h3 text-white mb-0">Quantidade de Vendas</h5>
              </div>
              <div class="col">
                <ul class="nav nav-pills justify-content-end">
                  <li class="nav-item mr-2 mr-md-0">
                    <a class="nav-link py-2 px-3"
                       href="#"
                       :class="{active: activePeriod === 'week'}"
                       @click.prevent="initBigChart('week')">
                      <span class="d-none d-md-block">60 Dias</span>
                      <span class="d-md-none">60 D</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link py-2 px-3"
                       href="#"
                       :class="{active: activePeriod === 'sixty'}"
                       @click.prevent="initBigChart('sixty')">
                      <span class="d-none d-md-block">Semana</span>
                      <span class="d-md-none">7 D</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <line-chart :height="350" ref="bigChart"
                        :chart-data="bigChart.chartData"
                        :extra-options="bigChart.extraOptions"/>
          </card>
        </div>

        <div class="col-xl-4">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </div>
            </div>

            <bar-chart :height="350" ref="barChart" :chart-data="redBarChart.chartData"/>
          </card>
        </div>
      </div>
      <!-- End charts-->

    </div>


    <b-card class="shadow mt-n5 m-3">
      <template v-slot:header>
        Pedidos por Dia
      </template>
    </b-card>

    <div class="row m-3">
      <div class="col">
        <b-card class="shadow">
          <template v-slot:header>
            Faturamento no período
          </template>
        </b-card>
      </div>
      <div class="col">
        <b-card class="shadow">
          <template v-slot:header>
            Ticket Médio no período
          </template>
        </b-card>
      </div>
    </div>

  </div>
</template>

<script>
  import LineChart from '@/components/Charts/LineChart'
  import BarChart from '@/components/Charts/BarChart'
  import * as chartConfigs from '@/components/Charts/config'

  export default {
    name: 'Dashboard',
    components: { BarChart, LineChart },
    data () {
      return {
        activePeriod: 'sixty',
        periods: {
          sixty: {
            data: [0, 20, 10, 30, 15, 40, 20, 60],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
          },
          week: {
            data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
          },
        },
        bigChart: {
          extraOptions: chartConfigs.blueChartOptions,
          chartData: {
            datasets: [],
            labels: [],
          },
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Vendas',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        }
      }
    },
    methods: {
      initBigChart (period) {
        this.bigChart.chartData = {
          datasets: [
            { label: 'Qtd Vendas', data: this.periods[period].data }
          ],
          labels: this.periods[period].labels,
        }
        this.activePeriod = period
      }
    },
    mounted () {
      this.initBigChart(0)
    }
  }
</script>

<style lang="scss" scoped>
</style>
