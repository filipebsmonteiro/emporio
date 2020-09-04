<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Dados do Usuário</h3>
            </div>
            <div class="col-4 text-right">
              <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
            </div>
          </div>
        </div>
        <template>
          <form @submit.prevent>

            <h6 class="heading-small text-muted mb-4">Dados Usuário</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Nome" input-classes="form-control-alternative" v-model="model.name"/>
                </div>
                <div class="col-lg-6">
                  <b-form-group label="Perfil" label-class="form-control-label"
                  :disabled="this.$route.name === 'painel.profile'">
                    <b-form-select v-model="model.perfil" :options="perfils"/>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Email" input-classes="form-control-alternative" v-model="model.email"/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Senha" input-classes="form-control-alternative" v-model="model.password"/>
                </div>
              </div>
            </div>
            <hr class="my-4"/>

          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Usuario from '@/repositories/Usuario'

  export default {
    name: 'Form',
    computed: {
      ...mapGetters({
        usuario: 'usuario/current',
        perfils_store: 'perfil/all'
      }),
      perfils () {
        return this.perfils_store.map(p => {
          return {
            text: p.nome,
            value: p.id
          }
        })
      }
    },
    data () {
      return {
        model: {
          nome: null,
          email: null,
          password: null,
        }
      }
    },
    methods: {
      ...mapActions([
        'usuario/listOne',
        'perfil/listAll',
        'usuario/listMe'
      ]),
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
        if (this.$route.params.id) {
          this.update()
        } else {
          this.create()
        }
      },
      create () {
        Usuario.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.usuario.index' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update () {
        Usuario.put(this.usuario.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.usuario.index' })
        }).catch(error => {
          // eslint-disable-next-line no-console
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      this['perfil/listAll']()

      let id = this.$route.params.id
      if (this.$route.name === 'painel.profile'){
        await this['usuario/listMe']()
        id = this.usuario.id
      }
      await this['usuario/listOne'](id)


      this.model = {
        ...this.model,
        ...this.usuario,
        perfil: this.usuario.perfils[0].id
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
