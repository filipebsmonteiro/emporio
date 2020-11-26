<template>
  <div class="container">
    <card shadow type="secondary">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-8">
            <h3 v-if="$route.name === 'cliente.auto_editar'" class="mb-0">Editar Meus Dados</h3>
            <h3 v-else class="mb-0">Novo Cliente</h3>
          </div>
          <div class="col-4 text-right">
            <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
          </div>
        </div>
      </div>
      <template>
        <form @submit="onSubmit">
          <h6 class="heading-small text-muted mb-4">Meus Dados</h6>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Nome *"
                            placeholder="Nome"
                            input-classes="form-control-alternative"
                            v-model="model.nome"
                            required
                />
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="CPF *"
                            placeholder="000.000.000-00"
                            input-classes="form-control-alternative"
                            v-model="model.CPF"
                            v-mask="'###.###.###-##'"
                            :valid="isCPFValid"
                            :disabled="this.$route.name === 'cliente.auto_editar' && isCPFValid"
                            required
                />
              </div>
              <div class="col-lg-4">
                <b-form-group label="Sexo *" label-class="form-control-label">
                  <b-select v-model="model.sexo" :options="['Masculino', 'Feminino']" required/>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Telefone *"
                            placeholder="Telefone"
                            input-classes="form-control-alternative"
                            v-model="model.phone"
                            v-mask="['(##) ####-####', '(##) #####-####']"
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Data de Nascimento *"
                            placeholder="Nascimento"
                            input-classes="form-control-alternative"
                            type="date"
                            v-model="model.nascimento"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Email *"
                            placeholder="nome@email.com"
                            input-classes="form-control-alternative"
                            v-model="model.email"
                            :disabled="this.$route.name === 'cliente.auto_editar'"
                            required
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Senha *"
                            type="password"
                            placeholder=" + + + +"
                            input-classes="form-control-alternative"
                            v-model="model.password"
                            required
                />
              </div>
            </div>
          </div>
          <hr class="my-4"/>
        </form>
      </template>
    </card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ClienteRepository from '@/repositories/Cliente'
  import { mask } from 'vue-the-mask'

  export default {
    name: 'Form',
    directives: { mask },
    computed: {
      ...mapGetters({
        cliente: 'cliente/current'
      }),
      isCPFValid() {
        let Soma;
        let Resto;
        Soma = 0;
        let strCPF = this.model.CPF.replace(/\D/g, '')
        if (strCPF.length < 11)
          return null

        if (
          strCPF === "00000000000" ||
          strCPF === "11111111111" ||
          strCPF === "22222222222" ||
          strCPF === "33333333333" ||
          strCPF === "44444444444" ||
          strCPF === "55555555555" ||
          strCPF === "66666666666" ||
          strCPF === "77777777777" ||
          strCPF === "88888888888" ||
          strCPF === "99999999999"
        ){
          return false;
        }

        for (let i=1; i<=9; i++)
          Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11))
          Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10)) )
          return false;
        Soma = 0;
        for (let i = 1; i <= 10; i++)
          Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11))
          Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11) ) )
          return false;
        return true;
      }
    },
    data () {
      return {
        model: {
          nome: '',
          CPF: '',
          phone: '',
          email: '',
          password: '',
          nascimento: '',
          sexo: '',
        }
      }
    },
    methods: {
      ...mapActions([
        'cliente/listMe'
      ]),
      validaRetornoErro (error) {
        const data = error.response ? error.response.data : null
        if (data.errors && data.message === 'The given data was invalid.') {
          // const reverse = data.errors.reverse()
          Object.keys(data.errors).map(campo => {
            data.errors[campo].map(msg => {
              this.$notify({
                type: 'danger',
                title: msg,
                verticalAlign: 'top',
                horizontalAlign: 'center'
              })
            })
          })
        }
      },
      async onSubmit (evt) {
        evt.preventDefault()
        if ( typeof this.isCPFValid === "boolean" && !this.isCPFValid){
          this.$notify({
            type: 'danger',
            title: 'CPF Inválido',
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          return
        }
        if (this.$route.name === 'cliente.auto_editar') {
          this.update()
        } else {
          this.create()
        }
      },
      create () {
        ClienteRepository.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'cliente' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update () {
        ClienteRepository.put(this.cliente.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'cliente' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      if (this.$route.name === 'cliente.auto_editar') {
        await this['cliente/listMe'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.cliente
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
