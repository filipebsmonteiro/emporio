<template>
  <b-input-group class="rounded-20 border border-light m-1 d-flex align-items-center">
    <b-dropdown :text="textSelected" class="" size="sm" variant="link">
      <b-dropdown-item
        v-for="(option, i) in options"
        :key="i"
        @click="changeFilterField(option)"
      >
        {{ option.text }}
      </b-dropdown-item>
    </b-dropdown>
    <b-input
      class="border-0 shadow-none bg-transparent"
      @keyup.enter="$emit('search', { field, value })"
      v-model="value"
    />
    <b-button variant="link" class="align-self-center" pill>
      <i class="fas fa-search" @click="$emit('search', { field, value })" />
    </b-button>
  </b-input-group>
</template>

<script>
export default {
  name: 'FilterInputGroup',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    options: function (newValue) {
      if (newValue.length > 0) {
        // eslint-disable-next-line no-console
        console.log(newValue)
        this.textSelected = newValue[0].text
        this.field = newValue[0].value
        this.value = ''
      }

    }
  },
  data () {
    return {
      textSelected: null,
      field: null,
      value: null
    }
  },
  methods: {
    changeFilterField (option) {
      this.field = option.value
      this.textSelected = option.text
    }
  }
}
</script>

<style lang="scss" scoped>
.rounded-20{
  border-radius: 20rem;
}
</style>
