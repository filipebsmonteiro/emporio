<template>
  <div>
    <div v-show="(items.length === 0 && filters.length > 0) || items.length > 0" class="row m-2">
      <div class="col-md-7">
        <router-link
          v-if="routeNew && textNew"
          size="sm"
          class="btn btn-primary btn-sm-block"
          :to="{ name: routeNew }">
          {{ textNew }}
        </router-link>
      </div>
      <div class="col-md-3">
        <slot name="table-data-filters">
          <FilterInputGroup
            :options="fields_filter_local"
            @search="evt => filtrar({ filters: [[evt.field, 'LIKE', `%${evt.value}%`]] })"
          />
        </slot>
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <b-dropdown
          :text="`Gerenciar colunas`"
          block
          variant="link"
          no-caret>
          <b-dropdown-form>
            <b-form-checkbox v-model="allSelected" @change="toggleAll">
              {{ allSelected ? 'Desmarcar todas' : 'Selecionar Todas' }}
            </b-form-checkbox>
            <b-form-checkbox-group v-model="selected" :options="fields_checkbox" stacked/>
          </b-dropdown-form>
        </b-dropdown>
      </div>
    </div>
    <TableSimple
      :fields="fieldsToShow"
      :filter="filter"
      :items="items"
      :loading="loading"
      :selectable="selectable"
      :paginator="paginator"
      :route-new="routeNew"
      :text-empty="textEmpty"
      :text-new="textNew"
      @select="evt => $emit('select', evt)"
      @list="filtrar"
    >
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope"/>
      </template>
    </TableSimple>
  </div>
</template>

<script>
import TableSimple from '@/components/TableSimple'
import FilterInputGroup from '@/components/FilterInputGroup'

export default {
  name: 'TableData',
  components: { FilterInputGroup, TableSimple },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    fieldsFilter: {
      type: Array,
      default: () => []
    },
    initial: {
      type: Array,
      default: () => []
    },
    disableFilters: {
      type: Boolean,
      default: false
    },

    /* Props TableSimple */
    textEmpty: {
      type: String
    },
    items: {
      type: Array
    },
    loading: {
      type: Boolean
    },
    selectable: {
      type: Boolean
    },
    paginator: {
      type: Object
    },
    routeNew: {
      type: String
    },
    textNew: {
      type: String
    },
    filter: {
      type: String,
      default: null
    }
    /* END Props TableSimple */
  },
  computed: {
    fieldsToShow () {
      if (this.selected.length === 0) {
        return this.fields.filter(field => {
          return this.initial_local.includes(field.key)
        })
      }
      return this.fields.filter(field => {
        return this.selected.includes(field.key)
      })
    }
  },
  data () {
    return {
      selected: [],
      fields_filter_local: [],
      fields_checkbox: [],
      initial_local: [],
      allSelected: false,
      filters: []
    }
  },
  methods: {
    toggleAll (checked) {
      this.selected = checked ?
        this.fields_checkbox.map(f => {
          return f.value
        }).slice() :
        this.initial_local
    },
    filtrar (evt) {
      let evento = {}

      try {
        evt.preventDefault()
      }catch (e) {
        this.filters = evt.filters ? evt.filters : []
        evento = evt
      }

      if (evt.page && evt.per_page) {
        evento = { ...evento, ...evt }
      } else {
        evento = {
          ...evento,
          page: this.paginator.page,
          per_page: this.paginator.per_page
        }
      }
      this.$emit('list', evento)
    }
  },
  mounted () {
    this.initial_local = this.initial
    this.selected = this.initial_local
    this.fields_checkbox = this.fields
      .map(f => {
        return {
          text: f.label,
          value: f.key
        }
      })

    this.fields_filter_local = this.fields_checkbox.filter(f => f.value !== 'status' && f.value !== 'id')
    if (this.fieldsFilter.length > 0) {
      this.fields_filter_local = this.fieldsFilter
        .map(f => {
          return {
            text: f.label,
            value: f.key
          }
        })
    }

    if (this.initial_local.length === 0) {
      this.allSelected = true
      this.initial_local = [this.fields[0].key]
      this.selected = this.fields.map(f => {
        return f.key
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-input-group {
  & > .custom-select {
    border-right: transparent;
  }

  & > .form-control {
    border-left: transparent;
    border-right: transparent;
  }

  & > .input-group-append > .btn-input {
    border: 1px solid #d1d3e2;
    border-left: transparent !important;
  }
}

/deep/ .dropdown-menu {
  transform: initial !important;
}

@media all and (max-width:768px) {
  .btn-sm-block {
    width: 100%;
    display:block;
    border-radius: 50rem!important;
  }
}
</style>
