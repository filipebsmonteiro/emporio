<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">My account</h3>
            </div>
            <div class="col-4 text-right">
              <a href="#!" class="btn btn-sm btn-primary">Settings</a>
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
            <!-- Description -->
            <h6 class="heading-small text-muted mb-4">About me</h6>
            <div class="pl-lg-4">
              <div class="form-group">
                <base-input alternative=""
                            label="About Me">
                  <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                </base-input>
              </div>
            </div>
          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Form',
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        }
      }
    },
  }
</script>

<style scoped>
</style>
