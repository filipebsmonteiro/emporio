<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-xl-4 mb-5 mb-xl-0">
        <div class="card shadow">
          <div class="card-body">
            <div class="text-center">
              <h3>
                Nome do CLiente<span class="font-weight-light">, 31 anos</span>
              </h3>
              <div class="h5 font-weight-300">
                <i class="ni location_pin mr-2"></i>Cidade, Bairro
              </div>
              <div class="h5 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>Cadastrado desde: {{ '2020-03-20' | formatDate(false) }}
              </div>
            </div>
            <!--div class="row">
              <div class="col">
                <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                  <div>
                    <span class="heading">{{ pedidos.length }}</span>
                    <span class="description">Pedidos</span>
                  </div>
                  <div>
                    <span class="heading">{{ finalizados }}</span>
                    <span class="description">Finalizados</span>
                  </div>
                  <div>
                    <span class="heading">{{ andamento }}</span>
                    <span class="description">Andamento</span>
                  </div>
                </div>
              </div>
            </div-->
            <base-button size="sm" class="bg-custom border-custom color-custom"
                         @click="$router.push({name: 'endereco.index'})" block>
              Selecionar Endereço
            </base-button>
            <div class="d-flex justify-content-between mt-3 mb-3">
              <base-button size="sm" class="bg-custom border-custom color-custom"
                           @click="$router.push({name: 'cliente.editar'})" block>
                Editar Perfil
              </base-button>
              <base-button size="sm" class="bg-custom border-custom color-custom mt-0"
                           @click="$router.push({name: ''})" block>
                Fidelidade
              </base-button>
            </div>
            <base-button size="sm" class="bg-custom border-custom color-custom"
                         @click="$router.push({name: ''})" block>
              Assinar Newletter
            </base-button>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <card shadow type="secondary" body-classes="p-0">
          <div slot="header" class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Últimos Pedidos</h3>
              </div>
              <div class="col-4 text-right">
                <router-link :to="{name: 'cliente.pedidos'}" class="btn btn-sm btn-primary">
                  Visualizar Todos
                </router-link>
              </div>
            </div>
          </div>
          <template>
            <p v-if="pedidos.length === 0" class="m-auto">Ops Não Temos Nada Aqui ainda</p>
            <b-table :fields="fields" :items="pedidos">
              <template v-slot:cell(data)="linha">
                {{ linha.item.created_at | formatDate }}
              </template>
              <template v-slot:cell(valor)="linha">
                {{ linha.item.valor | formatMoney }}
              </template>
              <template v-slot:cell(status)="linha">
                <b-badge variant="success">Saiu para entrega</b-badge>
              </template>
              <template v-slot:cell(id)="linha">
                <div class="w-100 d-flex justify-content-between">
                  <base-button size="sm" icon="fas fa-eye fa-2x" icon-only @click="$router.push({name: ''})"/>
                </div>
              </template>
            </b-table>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'detalhes',
    computed: {
      ...mapGetters({
        pedidos: 'pedidos/getAll'
      }),
    },
    data() {
      return {
        fields: [
          { key: 'data', label: 'Data' },
          { key: 'valor', label: 'Valor' },
          { key: 'status', label: 'Status' },
          { key: 'id', label: 'Acompanhar' }
        ]
      }
    },
    methods: {
      ...mapActions([
        'pedidos/listAll'
      ]),
    },
    mounted() {
      this['pedidos/listAll']({ limit: 4, orderBy: 'created_at', orderDirection: 'desc' })
      //TODO: Remover essa linha abaixo
      this.$store.commit('pedidos/setAll', [{},{},{},{}])
    }
  }
</script>

<style scoped>

</style>
