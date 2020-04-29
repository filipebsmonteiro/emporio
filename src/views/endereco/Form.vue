<template>
  <div class="container">
    <card shadow type="secondary">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-8">
            <h3 class="mb-0">Editar Endereço</h3>
          </div>
          <div class="col-4 text-right">
            <a href="#!" class="btn btn-primary">Salvar</a>
          </div>
        </div>
      </div>
      <template>
        <form @submit.prevent>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-4">
                <base-input alternative=""
                            label="CEP"
                            placeholder="Digite"
                            input-classes="form-control-alternative"
                            v-model="model.cep"
                />
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Cidade"
                            placeholder="Cidade"
                            input-classes="form-control-alternative"
                            v-model="model.cidade"
                />
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Bairro"
                            placeholder="Bairro"
                            input-classes="form-control-alternative"
                            v-model="model.bairro"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <base-input alternative=""
                            label="Logradouro"
                            placeholder="Logradouro"
                            input-classes="form-control-alternative"
                            v-model="model.logradouro"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <base-input alternative=""
                            label="Referência"
                            placeholder="Referência"
                            input-classes="form-control-alternative"
                            v-model="model.referencia"
                />
              </div>
            </div>
          </div>
          <hr class="my-4" />
        </form>
      </template>
    </card>
  </div>
</template>

<script>
  export default {
    name: 'Form',
    data() {
      return {
        model:{}
      }
    }
  }
</script>

<style scoped>

</style>
