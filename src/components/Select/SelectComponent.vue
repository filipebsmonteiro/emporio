<template>
  <b-overlay :show="searching">
    <vueSelect
      class="vSelect"
      v-model="local_model"
      :options="options"
      :disabled="disabled"
      @search="search"
      @input="changeModel"
      :label="label"
      :reduce="reduce">
      <template slot="no-options">
        <b-spinner v-if="searching" small/>
        <em v-else-if="search_text.length >= min">
            <slot name="no-results">Sem resultados para: {{ search_text }}</slot>
        </em>
        <em v-else>Digite {{ min }} letras</em>
      </template>
      <template slot="option" slot-scope="option">
        <slot name="option"  v-bind="option"/>
      </template>
    </vueSelect>
  </b-overlay>
</template>

<script>
  import vueSelect from 'vue-select'

  export default {
    name: 'SelectComponent',
    components: {
      vueSelect,
    },
    props: {
      model: null,
      options: {
        type: Array,
        default: () => []
      },
      disabled: {
        type: Boolean,
        default: false
      },
      searching: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number,
        default: 3
      },
      label: {
        type: String,
        default: null
      },
      reduce: {
        type: Function,
        default: null
      }
    },
    beforeUpdate(){
      this.local_model = this.model
    },
    data () {
      return {
        search_text: '',
        local_model: null
      }
    },
    mounted () {
      this.local_model = this.model
    },
    methods: {
      search (evt) {
        this.search_text = evt
        this.$emit('search', this.search_text)
      },
      changeModel (evt) {
        this.$emit('input', evt)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vSelect {
    /deep/ .vs__dropdown-toggle {
      height: calc(1.5em + .75rem + 2px);
      background-color: white;

      .vs__selected-options {
        min-width: 0;

        .vs__selected {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .vs__actions {
        order: 2;
        flex: 1 0 auto;
      }
    }
  }
</style>
