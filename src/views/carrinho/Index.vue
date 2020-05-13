<template>
  <div class="container mt-5 mb-5">
    <div v-if="this.carrinho.length === 0">
      <h2>Poxa, seu carrinho parece estar Vazio</h2>
      <p>Não tem problema!</p>
      <router-link :to="{name: 'produtos'}">Compre algum de nossos produtos agora!</router-link>
    </div>
    <div v-else>
      <div class="row">
        <div class="col">
          <Endereco/>
        </div>
        <div class="col"/>
        <div class="col">
          <Agendamento v-if="allowed.agendameto" @change="evt => { agendamento = evt }"/>
        </div>
      </div>
      <TableProduto class="mt-4" :produtos="produtos" @remove="removeCartItem" @updqtd="updateProdQtd"/>
      <div class="row mt-5">
        <div class="col">
          <b-form-group label="Observações deste Pedido" label-for="observacoes">
            <b-form-textarea id="observacoes" v-model="observacoes" rows="3"/>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group label="Forma de Pagamento" label-for="formas-pagamentos">
            <SelectComponent :options="formaspagamento" @input="evt => {forma_pagamento = evt.value}">
              <template slot="option" slot-scope="option">
                <span v-if="option.imagem" class="b-avatar rounded size-3 mr-2 ml-0">
                  <span class="b-avatar-custom">
                    <img :src="`/img/pagamento/${option.imagem}`"/>
                  </span>
                </span>
                {{ option.label }}
              </template>
            </SelectComponent>
          </b-form-group>
          <b-form-group v-if="forma_pagamento && forma_pagamento === 1"
                        label="Troco"
                        description="Ex.: Compra de 47,00 peça troco para 50,00">
            <b-form-input type="number" step="0.01" v-model="troco"/>
          </b-form-group>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">

          <b-form-group v-if="allowed.fidelidade && fidelidade > 0" label="Fidelidade">
            <b-input type="number" step="0.01" :max="fidelidade" v-model="fidelidade_field"/>
            <template v-slot:description>
              Valor disponível: {{ fidelidade | formatMoney }}
            </template>
          </b-form-group>

          <Cupom v-if="allowed.cupom" @validated="evt => {cupom_field = evt}"/>

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

            <b-list-group-item v-if="fidelidade_field && fidelidade_field > 0"
                               class="d-flex justify-content-between align-items-center bg-transparent">
              Fidelidade:
              <span>{{ fidelidade_field | formatMoney }}</span>
            </b-list-group-item>

            <b-list-group-item v-if="cupom_field"
                               class="d-flex justify-content-between align-items-center bg-transparent">
              Cupom:
              <span>{{ cupom_field.description }}</span>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center bg-transparent">
              Total:
              <span>{{ total | formatMoney }}</span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <base-button type="success" icon="fas fa-save" @click="persist" block>Finalizar Pedido</base-button>
    </div>
  </div>
</template>

<script>
  import Endereco from '@/views/carrinho/Endereco'
  import Agendamento from '@/views/carrinho/Agendamento'
  import Cupom from '@/views/carrinho/Cupom'
  import { mapActions, mapGetters } from 'vuex'
  import Pedido from '@/services/Pedido'
  import TableProduto from '@/views/carrinho/TableProduto'

  export default {
    name: 'Index',
    components: { TableProduto, Cupom, Agendamento, Endereco },
    computed: {
      ...mapGetters({
        fidelidade: 'fidelidade/getCurrent',
        store_formaspagamento: 'formapagamento/getAll',
        store_produtos: 'produto/getAll'
      }),
      allowed () {
        return {
          agendameto: parseInt(process.env.VUE_APP_PERMITE_AGENDAMENTO),
          cupom: parseInt(process.env.VUE_APP_PERMITE_CUPONS),
          fidelidade: parseInt(process.env.VUE_APP_PERMITE_FIDELIDADE)
        }
      },
      produtos () {
        return this.carrinho.map(cartProd => {
          let produto = cartProd
          const backendProd = this.store_produtos.find(pbe => pbe.id === cartProd.produto)
          if (!backendProd) {
            return produto
          }

          const categoria = backendProd.categoria ? backendProd.categoria.nome : null
          const imagem = backendProd.imagem ? backendProd.imagem : null
          const intervalo = backendProd.intervalo ? backendProd.intervalo : 1
          const minimo_unidade = backendProd.minimo_unidade ? backendProd.minimo_unidade : 1
          const nome = backendProd.nome
          const preco = backendProd.promocionar ? backendProd.valorPromocao : backendProd.preco
          const unidade_medida = backendProd.unidade_medida ? backendProd.unidade_medida : null
          let valor = preco / minimo_unidade
          let detalhes = []

          if (produto.multiplos.length > 0) {
            produto.multiplos.map(cartMult => {
              const backendMult = backendProd.multiplos.find(mbe => mbe.id === cartMult.multiplo)
              const backendIng = backendMult.ingredientes.find(ibe => ibe.id === cartMult.ingrediente)
              let valorIng = 0
              if (backendIng.nesseMultiplo) {
                valorIng = backendIng.nesseMultiplo
              } else {
                if (backendIng.preco) {
                  valorIng = backendIng.preco * cartMult.quantidade
                }
              }

              valor += valorIng
              detalhes = [...detalhes, {
                multiplo: backendMult.nome,
                ingrediente: backendIng.nome,
                valor: valorIng,
                quantidade: cartMult.quantidade
              }]
            })
          }

          produto = {
            ...produto,
            categoria,
            detalhes,
            intervalo,
            imagem,
            minimo_unidade,
            nome,
            unidade_medida,
            valor
          }
          return produto

        })
      },
      subtotal () {
        return this.produtos.reduce(function (prev, cur) {
          return prev + (cur.valor * cur.quantidade)
        }, 0)
      },
      total () {
        return this.subtotal + this.taxa_entrega + this.fidelidade_field
      },
      formaspagamento () {
        if (this.store_formaspagamento && Array.isArray(this.store_formaspagamento)) {
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
        agendamento: null,
        carrinho: [],
        cupom_field: null,
        fidelidade_field: null,
        forma_pagamento: null,
        observacoes: null,
        taxa_entrega: null,
        troco: null,
      }
    },
    methods: {
      ...mapActions([
        'fidelidade/listOne',
        'formapagamento/listAll',
        'produto/listAll',
        'mainbar/setQuantidade'
      ]),
      removeCartItem (time) {
        this.carrinho = this.carrinho.filter(item => item.time !== time)
        this.$localStorage.set('carrinho', JSON.stringify(this.carrinho))
        this['mainbar/setQuantidade'](this.carrinho.length)
      },
      updateProdQtd (item) {
        this.carrinho.map(p => {
          if (p.produto === item.produto) {
            p.quantidade = item.quantidade
          }
        })
      },
      async persist () {
        await Pedido.post({
          endereco_id: this.$localStorage.get('endereco_id'),
          loja_id: this.$localStorage.get('loja_id'),
          agendamento: this.agendamento,
          cupom_field: this.cupom_field,
          fidelidade_field: this.fidelidade_field,
          forma_pagamento: this.forma_pagamento,
          troco: this.troco,
          observacoes: this.observacoes,
          produtos: this.carrinho
        }).then(async response => {

          if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED)) {
            this.$analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
              em: process.env.VUE_APP_FACEBOOK_EMAIL,
              debug: true
            })
            this.$analytics.fbq.event('Purchase', {
              content_ids: response.data.produtos.map(p => p.id),
              content_type: 'product',
              currency: 'BRL',
              value: response.data.valor,
            })
          }

          await this.$localStorage.remove('carrinho')
          await this.$swal({
            type: 'success',
            icon: 'success',
            title: `Pedido Realizado com Sucesso!`,
            text: 'Deseja acompanhar o Status do seu Pedido?',
            focusConfirm: true,
            confirmButtonText: 'Acompanhar!',
          }).then(result => {
            if (result.value) {
              this.$router.push({ name: 'pedido.show', params: { referencia: response.data.referencia } })
            }
          })

        }).catch(error => {
          const data = error.response.data
          if (data.errors && data.message === 'The given data was invalid.') {
            if (data.errors.endereco_id) {
              this.$swal({
                type: 'danger',
                title: `Local de Entrega`,
                text: 'Você ainda não selecionou o Local de entrega!',
                focusConfirm: true,
                confirmButtonText: 'Selecionar endereço!',
              }).then(result => {
                if (result.value) {
                  this.$router.push({ name: 'endereco.index' })
                }
              })
              delete data.errors.endereco_id
              delete data.errors.loja_id
            }

            Object.keys(data.errors).map(campo => {
              data.errors[campo].map(msg => {
                this.$notify({
                  type: 'danger',
                  title: msg,
                  verticalAlign: 'bottom',
                  horizontalAlign: 'center'
                })
              })
            })
          }
        })
      }
    },
    async mounted () {
      await this['formapagamento/listAll']()
      //TODO: REMOVER DADOS MOCKADOS CLIENTE
      await this['fidelidade/listOne'](1)
      const prods = this.$localStorage.get('carrinho', '[]')
      this.carrinho = JSON.parse(prods)
      if (this.carrinho.length > 0) {
        await this['produto/listAll']({ ids: this.carrinho.map(p => p.produto) })
      }

      if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED) && this.carrinho.length > 0) {
        this.$analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
          em: process.env.VUE_APP_FACEBOOK_EMAIL
        })
        const value = this.produtos.reduce((prev, cur) => {
          return prev + (cur.valor * cur.quantidade)
        }, 0)
        this.$analytics.fbq.event('InitiateCheckout', {
          contents: prods.map(p => {
            return {
              id: p.produto,
              quantity: p.quantidade
            }
          }),
          currency: 'BRL',
          num_items: prods.length,
          value,
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .size-3 {
    width: 3rem;
    height: 3rem;
  }
</style>
