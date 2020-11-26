<template>
  <div class="container">
    <form @submit="onSubmit">
      <div class="row">
        <div class="col">
          <div class="h-50">
            <h1>Endereço</h1>
            <div class="row">
              <div class="col">
                <h3>Asa Sul</h3>
                <p><b>Endereço:</b> Comércio Local Sul 406 BL D Loja 23/27</p>
                <p>Brasília - DF / CEP: 70255-540</p>
                <p>(61) 3244-0628</p>
              </div>
              <div class="col">
                <h3>Horários</h3>
                <p><b>Loja:</b> 08:30 às 19:30</p>
                <p><b>Delivery:</b> 09:00 às 17:30</p>
              </div>
            </div>
            <a class="btn btn-sm btn-default"
               href="https://www.google.com/maps/dir/?api=1&amp;destination=-15.8193030,-47.8949650"
               target="_blank">
              Localização da Loja</a>
          </div>
          <hr/>
          <div>
            <h1><i class="fas fa-credit-card"></i> Formas de Pagamento</h1>
            <img src="/img/pagamento/Dinheiro.png">
            <img src="/img/pagamento/cCredito.png">
            <img src="/img/pagamento/cDebito.png">
          </div>
        </div>
        <div class="col">
          <h1>Mande sua Mensagem</h1>
          <p>Quer saber mais informações sobre nosssos produtos e serviços? Quer dar sua opinião? Pedir orçamentos?
            Então
            utilize o formulário para enviar sua mensagem. Se preferir , fale conosco também através de nossos números
            telefônicos. Ou utilize nossos perfis nas redes sociais.</p>
          <p>Você é sempre bem-vindo(a)</p>
          <b-form-group label="Nome">
            <b-form-input v-model="model.nome" required/>
          </b-form-group>
          <b-form-group label="Email">
            <b-form-input v-model="model.email" required/>
          </b-form-group>
          <b-form-group label="Telefone">
            <b-form-input v-model="model.phone" required/>
          </b-form-group>
          <b-form-group label="Mensagem">
            <b-form-textarea v-model="model.mensagem" required/>
          </b-form-group>
          <b-btn variant="success" block type="submit">Enviar</b-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Loja from '@/repositories/Loja'

  export default {
    name: 'Contato',
    data () {
      return {
        model: {
          nome: null,
          email: null,
          phone: null,
          mensagem: null,
          loja: 1
        }
      }
    },
    methods: {
      validaRetornoErro (error) {
        const data = error.response ? error.response.data : null
        if (data.errors && data.message === 'The given data was invalid.') {
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
      },
      async onSubmit (evt) {
        evt.preventDefault()
        Loja.enviaSac(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Contato Realizado com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'produtos' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
    },
    mounted () {
      if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED)) {
        this.$analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
          em: process.env.VUE_APP_FACEBOOK_EMAIL
        })
        this.$analytics.fbq.event('PageView')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gamela-color {
    color: #5E3D0B;
  }

  .gamela-title {
    font-size: 70px;
  }
</style>
