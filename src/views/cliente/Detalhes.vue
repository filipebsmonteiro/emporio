<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-xl-4 mb-5 mb-xl-0">
        <div class="card shadow">
          <div class="card-body">
            <div class="text-center">
              <b-overlay :show="isLoadingCliente">
                <h3>
                  {{ cliente.nome }}<span
                  class="font-weight-light">, {{ cliente.nascimento | ageFromBirthday }} anos</span>
                </h3>

                <b-overlay :show="isLoadingEndrecos">
                  <div v-if="enderecos.length > 0" class="h5 font-weight-300">
                    <i class="ni location_pin mr-2"></i>{{ `${enderecos[0].Cidade}, ${enderecos[0].Bairro}` }}
                  </div>
                  <div v-else class="h5 font-weight-300">
                    <i class="ni location_pin mr-2"></i>Sem endereços cadastrados!
                  </div>
                </b-overlay>

              <div class="h5 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>Cadastrado desde: {{ cliente.created_at | formatDate(false)
                }}
              </div>
              </b-overlay>
            </div>
            <base-button size="sm" class="bg-custom border-custom color-custom"
                         @click="$router.push({name: 'endereco.index'})" block>
              Selecionar Endereço
            </base-button>
            <div class="d-flex justify-content-between mt-3 mb-3">
              <base-button size="sm" class="bg-custom border-custom color-custom"
                           @click="$router.push({name: 'cliente.auto_editar'})" block>
                Editar Perfil
              </base-button>
              <base-button size="sm" class="bg-custom border-custom color-custom mt-0"
                           @click="$router.push({name: 'fidelidade.index'})" block>
                Fidelidade
              </base-button>
            </div>
            <base-button size="sm" class="bg-custom border-custom color-custom" @click="toggleNewsletter" block>
              {{ cliente && cliente.newsletter ? 'Descadastrar' : 'Assinar' }} Newletter
            </base-button>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <b-overlay :show="isLoadingPedidos">
          <card shadow type="secondary" body-classes="p-0">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Últimos Pedidos</h3>
                </div>
                <div class="col-4 text-right">
                  <router-link :to="{name: 'pedido.index'}" class="btn btn-sm btn-primary">
                    Visualizar Todos
                  </router-link>
                </div>
              </div>
            </div>
            <template>
              <p v-if="pedidos.length === 0" class="m-auto">Ops! Não temos nada aqui ainda!</p>
              <b-overlay :show="isLoadingPedidos">
                <b-table :fields="fields" :items="pedidos">
                  <template v-slot:cell(data)="{ item: { created_at: date } }">
                    {{ date.date | formatDate }}
                  </template>
                  <template v-slot:cell(valor)="{ item }">
                    {{ item.valor | formatMoney }}
                  </template>
                  <template v-slot:cell(status)="{ item }">
                    <b-badge variant="success">{{ item.status }}</b-badge>
                  </template>
                  <template v-slot:cell(id)="{ item }">
                    <div class="w-100 d-flex justify-content-between">
                      <base-button
                        size="sm"
                        icon="fas fa-eye fa-2x"
                        @click="$router.push({name: 'pedido.show', params: { referencia: item.referencia }})"
                        icon-only
                      />
                    </div>
                  </template>
                </b-table>
              </b-overlay>
            </template>
          </card>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Cliente from '@/services/Cliente'

  export default {
    name: 'Detalhes',
    computed: {
      ...mapGetters({
        cliente: 'cliente/getCurrent',
        isLoadingCliente: 'cliente/isLoading',
        pedidos: 'pedido/getAll',
        isLoadingPedidos: 'pedido/isLoading',
        enderecos: 'endereco/getAll',
        isLoadingEndrecos: 'endereco/isLoading',
      }),
    },
    data () {
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
        'endereco/listAll',
        'pedido/listAllPaginated',
        'cliente/listMe',
      ]),
      toggleNewsletter () {
        const estadoAtual = !!this.cliente.newsletter
        Cliente.put(this.cliente.id, {
          ...this.cliente,
          newsletter: !estadoAtual
        }).then(() => {
          this.$notify({
            type: 'success',
            title: 'Ação realizada com Sucesso!',
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this['cliente/listMe']()
        })
      }
    },
    mounted () {
      this['endereco/listAll']()
      this['pedido/listAllPaginated']({ per_page: 5 })
      this['cliente/listMe']()
    }
  }
</script>

<style lang="scss" scoped>
</style>
