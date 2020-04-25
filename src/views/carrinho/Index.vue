<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col">
        <Endereco/>
      </div>
      <div class="col"/>
      <div class="col">
        <Agendamento/>
      </div>
    </div>
    <Produto class="mt-4" :produtos="produtos"/>
    <div class="row mt-5">
      <div class="col">
        <b-form-group label="Observações deste Pedido" label-for="observacoes">
          <b-form-textarea id="observacoes" v-model="observacoes" rows="3"/>
        </b-form-group>
      </div>
      <div class="col">
        <b-form-group label="Forma de Pagamento" label-for="formas-pagamentos">
          <SelectComponent :options="formaspagamento">
            <template slot="option" slot-scope="option">
              <span v-if="option.imagem" class="b-avatar rounded size-3 mr-2 ml-0">
                <span class="b-avatar-custom">
                  <img :src="option.imagem" />
                </span>
              </span>
              {{ option.label }}
            </template>
          </SelectComponent>
          <!--b-form-select id="formas-pagamentos" v-model="forma_pagamento" :options="formaspagamento"/-->
        </b-form-group>
        <b-form-group label="Troco" description="Ex.: Compra de 47,00 peça troco para 50,00">
          <b-input v-model="troco"/>
        </b-form-group>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">

        <b-form-group label="Fidelidade">
          <b-input type="number" step="0.01" v-model="vlrResgatar"/>
          <template v-slot:description>
            Valor disponível: {{ valorResgate | formatMoney }}
          </template>
        </b-form-group>

        <Cupom/>

      </div>
      <div class="col">
        <h1>Valor do Pedido</h1>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center bg-transparent">
            Subtotal:
            <span>{{ subtotal | formatMoney }}</span>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center bg-transparent">
            Taxa de Entrega:
            <span>{{ taxa_entrega | formatMoney }}</span>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center bg-transparent">
            Fidelidade:
            <span>{{ fidelidade_discount | formatMoney }}</span>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center bg-transparent">
            Cupom:
            <span>{{ cupom_discount | formatMoney }}</span>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center bg-transparent">
            Total:
            <span>{{ total | formatMoney }}</span>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <base-button type="success" icon="fas fa-save" block>
      Finalizar Pedido
    </base-button>
  </div>
</template>

<script>
  import Endereco from '@/views/carrinho/Endereco'
  import Produto from '@/views/carrinho/Produto'
  import Agendamento from '@/views/carrinho/Agendamento'
  import Cupom from '@/views/carrinho/Cupom'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Index',
    components: { Cupom, Agendamento, Produto, Endereco },
    computed: {
      ...mapGetters({
        store_formaspagamento: 'formapagamento/getAll',
        store_pedidos: 'pedido/getAll'
      }),
      subtotal () {
        return 50
      },
      total () {
        return this.subtotal + this.taxa_entrega + this.fidelidade_discount + this.cupom_discount
      },
      formaspagamento () {
        if (this.store_formaspagamento && Array.isArray(this.store_formaspagamento)){
          return this.store_formaspagamento.map(forma => {
            return {
              label: forma.nome,
              value: forma.id,
              imagem: forma.imagem
            }
          })
        }
        return []
      }
    },
    data () {
      return {
        agendamento: '',
        observacoes: '',
        forma_pagamento: {},
        troco: 0,
        canResgate: true,
        valorResgate: 2,
        vlrResgatar: 2,
        taxa_entrega: 15,
        fidelidade_discount: 1.4,
        cupom_discount: 4,
        produtos: []
      }
    },
    methods: {
      ...mapActions([
        'formapagamento/listAll',
        'pedido/listAll'
      ])
    },
    async mounted () {
      await this['formapagamento/listAll']()
      await this['pedido/listAll']()
      this.produtos = this.store_pedidos[9].produtos
    }
  }
</script>

<style lang="scss" scoped>
.size-3 {
  width: 3rem;
  height: 3rem;
}
</style>
