<template>
  <div class="container">
    <card shadow type="secondary">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-8">
            <h3 class="mb-0">Editar Meus Dados</h3>
          </div>
          <div class="col-4 text-right">
            <a href="#!" class="btn btn-primary">Salvar</a>
          </div>
        </div>
      </div>
      <template>
        <form @submit.prevent>
          <h6 class="heading-small text-muted mb-4">User information</h6>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Username"
                            placeholder="Username"
                            input-classes="form-control-alternative"
                            v-model="model.username"
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Email address"
                            placeholder="jesse@example.com"
                            input-classes="form-control-alternative"
                            v-model="model.email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="First name"
                            placeholder="First name"
                            input-classes="form-control-alternative"
                            v-model="model.firstName"
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Last name"
                            placeholder="Last name"
                            input-classes="form-control-alternative"
                            v-model="model.lastName"
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

<style lang="scss" scoped>
</style>
