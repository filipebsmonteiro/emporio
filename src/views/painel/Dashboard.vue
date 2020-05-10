<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <!--Cards Header-->
        <div class="col-md-3">
          <stats-card title="Abertos" :sub-title="`${cards.abertos}`" type="gradient-info" icon="ni ni-active-40"/>
        </div>
        <div class="col-md-3">
          <stats-card title="Confirmados" :sub-title="`${cards.confirmados}`" type="gradient-green" icon="ni ni-check-bold"/>
        </div>
        <div class="col-md-3">
          <stats-card title="Enviados" :sub-title="`${cards.enviados}`" type="gradient-green" icon="ni ni-delivery-fast"/>
        </div>
        <div class="col-md-3">
          <stats-card title="Cancelados" :sub-title="`${cards.cancelados}`" type="gradient-danger" icon="fas fa-ban"/>
        </div>
        <!--End Cards Header-->
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="gradient-primary" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Visão Geral</h6>
                <h5 class="h3 text-white mb-0">Quantidade de Vendas</h5>
              </div>
              <div class="col">
                <div class="nav nav-pills justify-content-end">
                  <b-btn class="font-weight-light text-blue" size="sm" @click="loadBigChart('last_month')">
                    Mês Ant.
                  </b-btn>
                  <b-btn class="font-weight-light text-blue" size="sm" @click="loadBigChart('month')">
                    Mês
                  </b-btn>
                  <b-btn class="font-weight-light text-blue" size="sm" @click="loadBigChart('two_weeks')">
                    2 Semanas
                  </b-btn>
                  <b-btn class="font-weight-light text-blue" size="sm" @click="loadBigChart()">Semana</b-btn>
                </div>
              </div>
            </div>
            <!--  ref="bigChart"  :extra-options="bigChart.extraOptions"/> -->
            <line-chart :height="350" :chart-data="bigChart.chartData"/>
          </card>
        </div>

        <div class="col-xl-4">
          <card type="gradient-warning" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Semanal</h6>
                <h5 class="h3 text-white mb-0">Semana Atual</h5>
              </div>
            </div>

            <!-- ref="barChart" -->
            <bar-chart :height="350" :chart-data="weekChart"/>
          </card>
        </div>
      </div>
      <!--End charts-->

      <!--Cards Bottom-->
      <div class="row mt-5">
        <div class="col-md-4">
          <stats-card title="Faturamento no período"
                      :sub-title="cards.faturamento | formatMoney"
                      class="shadow"
                      type="gradient-success"
                      icon="fas fa-dollar-sign"/>
        </div>
        <div class="col-md-4">
          <stats-card title="Ticket Médio no período"
                      type="gradient-success"
                      :sub-title="cards.media_valor | formatMoney"
                      class="shadow"
                      icon="fas fa-dollar-sign"/>
        </div>
        <div class="col-md-4">
          <stats-card title="Ticket Médio Entrega"
                      type="gradient-success"
                      :sub-title="cards.media_entrega | formatMoney"
                      class="shadow"
                      icon="fas fa-dollar-sign"/>
        </div>
      </div>
      <!--End Cards Bottom-->
    </div>
  </div>
</template>

<script>
  import LineChart from '@/components/Charts/LineChart'
  import BarChart from '@/components/Charts/BarChart'
  import * as chartConfigs from '@/components/Charts/config'
  import moment from 'moment'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    components: { BarChart, LineChart },
    computed: {
      ...mapGetters({
        qtd_pedidos: 'dashboard/getAll',
        cards: 'dashboard/getCards'
      }),
      bigChart () {
        let datasets = []
        let labels = []

        if (this.qtd_pedidos) {
          if (Object.keys(this.qtd_pedidos).length > 0) {
            let data = []
            for (var [label, value] of Object.entries(this.qtd_pedidos)) {
              labels = [...labels, label]
              data = [...data, value]
            }
            datasets = [{ label: 'Qtd Vendas', data }]
          }

          if (Array.isArray(this.qtd_pedidos)) {
            datasets = []
            this.qtd_pedidos.map((obj, data_label) => {
              let data = []
              labels = []// Reset Labels, To Get just Last
              for (var [label, value] of Object.entries(obj)) {
                labels = [...labels, label]
                data = [...data, value]
              }
              datasets = [...datasets,
                { label: `${data_label + 1}ª`, data }
              ]
            })
          }

        }

        return {
          extraOptions: chartConfigs.blueChartOptions,
          chartData: {
            datasets,
            labels,
          }
        }
      },
      weekChart () {
        return {
          labels: this.weekDays,
          datasets: [
            {
              label: 'Vendas',
              data: this.weekSales,
            }
          ]
        }
      }
    },
    data () {
      return {
        weekDays: [],
        weekSales: []
      }
    },
    methods: {
      ...mapActions([
        'dashboard/listAll'
      ]),
      async loadBigChart (period = null) {

        // moment().subtract('60', 'days').format('YYYY-MM-DD HH:mm'),
        let params = {}
        switch (period) {
          case 'last_month': {
            const firstDayMonth = moment().subtract(1, 'months').startOf('month')
            const lastDayMonth = moment().subtract(1, 'months').endOf('month')
            params = {
              data_inicio: firstDayMonth.format('YYYY-MM-DD HH:mm'),
              data_termino: lastDayMonth.format('YYYY-MM-DD HH:mm'),
              group_by: 'week'
            }
            break
          }
          case 'month': {
            const firstDayMonth = moment().startOf('month')
            const lastDayMonth = moment().endOf('month')
            params = {
              data_inicio: firstDayMonth.format('YYYY-MM-DD HH:mm'),
              data_termino: lastDayMonth.format('YYYY-MM-DD HH:mm'),
              group_by: 'week'
            }
            break
          }
          case 'two_weeks': {
            const firstDayLastWeek = moment().subtract('7', 'days').startOf('week')
            const lastDayLastWeek = moment().subtract('7', 'days').endOf('week')
            params = {
              data_inicio: firstDayLastWeek.format('YYYY-MM-DD HH:mm'),
              data_termino: lastDayLastWeek.format('YYYY-MM-DD HH:mm'),
            }
            await this['dashboard/listAll'](params)
            const dataLastWeek = this.qtd_pedidos

            const firstDayCurrentWeek = moment().startOf('week')
            const lastDayCurrentWeek = moment().endOf('week')
            params = {
              data_inicio: firstDayCurrentWeek.format('YYYY-MM-DD HH:mm'),
              data_termino: lastDayCurrentWeek.format('YYYY-MM-DD HH:mm'),
            }
            await this['dashboard/listAll'](params)
            this.$store.commit('dashboard/setAll', [dataLastWeek, this.qtd_pedidos])
            return
            break
          }
          case null: {
            params = {
              data_inicio: moment().startOf('week').format('YYYY-MM-DD HH:mm'),
              data_termino: moment().endOf('week').format('YYYY-MM-DD HH:mm')
            }
            break
          }
        }

        await this['dashboard/listAll'](params)
      }
    },
    async mounted () {
      // Carrega Semana atual
      await this.loadBigChart()

      // Grava Dados da Semana Atual no Gráfico Menor
      for (var [label, data] of Object.entries(this.qtd_pedidos)) {
        this.weekDays = [...this.weekDays, label]
        this.weekSales = [...this.weekSales, data]
      }

    }
  }
</script>

<style lang="scss" scoped>
</style>
