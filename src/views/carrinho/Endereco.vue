<template>
  <div>
    <h1>Endereço de Entrega</h1>
    <div v-if="$localStorage.get('endereco_id') && $localStorage.get('endereco_id') === '1'">
      Retirada na Loja<br/>
    </div>
    <div v-else>
      CEP : {{ endereco.CEP }}<br/>
      Logradouro : {{ endereco.Logradouro }}<br/>
      Bairro : {{ endereco.Bairro }}<br/>
      Cidade : {{ endereco.Cidade }}
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Endereco',
    computed: {
      ...mapGetters({
        store_endereco: 'endereco/current'
      }),
      endereco() {
        if (!this.store_endereco.CEP){
          return {
            CEP: 0,
            Logradouro: "",
            Lojas_idLojas: 1
          }
        }
        return this.store_endereco
      }
    },
    methods: {
      ...mapActions([
        'endereco/listOne'
      ])
    },
    async mounted() {
      await this['endereco/listOne'](this.$localStorage.get('endereco_id'))
    }
  }
</script>

<style lang="scss" scoped>
</style>
