<template>
  <div>
    <h1>Endereço de Entrega</h1>
    <div v-if="endereco && endereco.CEP">
      CEP : {{ endereco.CEP }}<br/>
      Logradouro : {{ endereco.Logradouro }}<br/>
      Bairro : {{ endereco.Bairro }}<br/>
      Cidade : {{ endereco.Cidade }}
    </div>
    <div v-else>
      Retirada na Loja:<br/>
      Logradouro : {{ endereco.Logradouro }}<br/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Endereco',
    computed: {
      ...mapGetters({
        enderecos: 'endereco/getAll',
        endereco: 'endereco/getCurrent'
      }),
      endereco() {
        return {
          CEP: 0,
          Logradouro: "Comércio Local Sul 406 BL D Loja 23/27",
          Lojas_idLojas: 1
        }
      }
    },
    methods: {
      ...mapActions([
        'endereco/listAll',
        'endereco/listOne'
      ])
    },
    async mounted() {
      await this['endereco/listAll']()
      await this['endereco/listOne'](1)
    }
  }
</script>

<style scoped>
</style>
