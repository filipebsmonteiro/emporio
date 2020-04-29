<template>
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
        <!-- Address -->
        <h6 class="heading-small text-muted mb-4">Contact information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-md-12">
              <base-input alternative=""
                          label="Address"
                          placeholder="Home Address"
                          input-classes="form-control-alternative"
                          v-model="model.address"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <base-input alternative=""
                          label="City"
                          placeholder="City"
                          input-classes="form-control-alternative"
                          v-model="model.city"
              />
            </div>
            <div class="col-lg-4">
              <base-input alternative=""
                          label="Country"
                          placeholder="Country"
                          input-classes="form-control-alternative"
                          v-model="model.country"
              />
            </div>
            <div class="col-lg-4">
              <base-input alternative=""
                          label="Postal code"
                          placeholder="Postal code"
                          input-classes="form-control-alternative"
                          v-model="model.zipCode"
              />
            </div>
          </div>
        </div>
        <hr class="my-4" />
      </form>
    </template>
  </card>
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
