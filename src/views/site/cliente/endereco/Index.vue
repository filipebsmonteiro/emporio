<template>
  <div class="container">
    <b-card no-body>
      <template v-slot:header>
        <div class="d-flex justify-content-between">
          <div v-if="retiradaAllowed">
            <b-form-group v-if="lojas.length > 1"
                          label-cols-lg="3"
                          label="Retirar na Loja"
                          label-size="lg"
                          class="m-0"
                          label-class="p-0">
              <b-form-select :options="lojas" size="sm" @change="selectLoja"/>
            </b-form-group>
            <b-button v-else variant="primary" @click="selectLoja(store_lojas[0].id)"
                      size="sm">Retirar na Loja
            </b-button>
          </div>
          <router-link class="btn btn-sm btn-primary" :to="{name: 'endereco.criar'}">Novo</router-link>
        </div>
      </template>

      <b-overlay :show="isLoading">
        <b-table :fields="fields" :items="enderecos" responsive>
          <template v-slot:cell(select)="{ item }">
            <base-button
              size="sm"
              type="link"
              class="bg-custom color-custom border-custom"
              @click="selectEndereco(item)"
            >Selecionar
            </base-button>
          </template>
          <template v-slot:cell(id)="{ item: { id }}">
            <base-button
              size="sm"
              type="link"
              icon="fas fa-edit fa-2x"
              @click="$router.push({ name: 'endereco.editar', params: { id } })"
              icon-only
            />
          </template>
        </b-table>
      </b-overlay>

    </b-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters({
        enderecos: 'endereco/all',
        isLoading: 'endereco/isLoading',
        store_lojas: 'loja/all',
        loja: 'loja/current',
      }),
      retiradaAllowed () {
        return parseInt(process.env.VUE_APP_PERMITE_RETIRADA_LOJA)
      },
      lojas () {
        if (this.store_lojas && Array.isArray(this.store_lojas)) {
          return this.store_lojas.map(loja => {
            return {
              text: `${loja.Logradouro} ${loja.Bairro}, ${loja.Cidade}`,
              value: loja.id
            }
          })
        }
        return []
      }
    },
    data () {
      return {
        fields: [
          { key: 'select', label: 'Selecionar' },
          { key: 'id', label: 'Editar' },
          { key: 'Logradouro', label: 'Logradouro' },
          { key: 'Bairro', label: 'Bairro' },
          { key: 'Cidade', label: 'Cidade' },
          { key: 'Referencia', label: 'Referencia' },
        ]
      }
    },
    methods: {
      ...mapActions([
        'endereco/listAll',
        'endereco/listResponsavel',
        'loja/listAll'
      ]),
      async selectEndereco (item) {
        this.$localStorage.remove('loja_id')
        this.$localStorage.remove('endereco_id')
        await this['endereco/listResponsavel']({ CEP: item.CEP, vm: this })
        if (Object.keys(this.loja).length > 0) {
          this.$localStorage.set('endereco_id', item.id)
          this.$localStorage.set('loja_id', this.loja.id)
          this.$router.push({ name: 'produtos' })
        }
      },
      selectLoja (id) {
        this.$localStorage.remove('loja_id')
        this.$localStorage.remove('endereco_id')
        // Endereço 1 Reservado para retirada na Loja
        this.$localStorage.set('endereco_id', 1)
        this.$localStorage.set('loja_id', id)
        this.$router.push({ name: 'produtos' })
      }
    },
    async mounted () {
      await this['endereco/listAll']()
      await this['loja/listAll']()
    }
  }
</script>

<style lang="scss" scoped>
</style>
