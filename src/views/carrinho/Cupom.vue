<template>
  <b-form>
    <b-form-group label="Cupom" label-for="cupom">
      <b-input id="cupom" v-model="text" />
      <template v-slot:description>
        <span v-if="isValidated">{message} - {description}</span>
      </template>
    </b-form-group>
    <base-button variant="outline-primary" :disabled="text === ''" block>Validar Cupom</base-button>
  </b-form>
</template>

<script>
  export default {
    name: 'Cupom',
    data () {
      return {
        text: '',
        isValidated: true,
        message: 'MESSAGE',
        description: 'description'
      }
    }
  }
</script>

<style scoped>

</style>
