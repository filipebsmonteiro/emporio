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
  export default {
    name: 'Dashboard'
  }
</script>

<style lang="scss" scoped>
</style>
