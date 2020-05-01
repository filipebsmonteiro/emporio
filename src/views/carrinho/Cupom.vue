<template>
  <b-form>
    <b-form-group label="Cupom" label-for="cupom">
      <base-input v-if="isValid" :valid="true" :value="text" disabled/>
      <b-input v-else v-model="text" :class="{'is-invalid': message && !isValid}"/>
    </b-form-group>
    <b-form-invalid-feedback :state="!(message && !isValid)" class="mt--3 mb-3">
      {{ message }}
    </b-form-invalid-feedback>
    <b-form-valid-feedback :state="message && isValid" class="mt--3 mb-3">
      {{ message }}
    </b-form-valid-feedback>
    <base-button
      variant="outline-primary"
      :disabled="isValid || text === ''" block
      @click="validaCupom">
      Validar Cupom</base-button>
  </b-form>
</template>

<script>
  import Cupom from '@/services/Cupom'

  export default {
    name: 'Cupom',
    data () {
      return {
        text: '',
        isValid: false,
        message: null
      }
    },
    methods: {
      validaCupom() {
        Cupom.valida({text: this.text})
          .then(response => {
            this.isValid = true
            this.message = response.data.message
            this.$emit('validated', {...response.data, value: this.text})
          })
          .catch(erro => {
            if (erro.response.status === 400) {
              this.message = erro.response.data.message
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
