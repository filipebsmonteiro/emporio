<template>
  <div>
    <b-card v-if="loading || items.length > 0" body-class="p-0">
      <b-overlay :show="loading">
        <b-table
          :filter="filter"
          :fields="localFields"
          :items="items"
          :ref="ref"
          head-variant="light"
          responsive
          hover
        >
          <template v-if="selectable" v-slot:head(selected)>
            <b-check v-model="selectAll" @change="onRowSelected(items)">
              <slot name="select-text"/>
            </b-check>
          </template>
          <template v-if="selectable" v-slot:cell(selected)="{ item }">
            <b-check v-model="item.rowSelected" @change="onRowSelected(item)"/>
          </template>
          <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
            <slot :name="slotName" v-bind="slotScope"/>
          </template>
        </b-table>
      </b-overlay>
      <slot name="paginator">
        <Paginator
          v-if="paginator.total > paginator.per_page"
          :page="paginator.page"
          :per-page="paginator.per_page"
          :total="paginator.total"
          class="mt-3"
          @change="evt => $emit('list', evt)"
        />
      </slot>
    </b-card>
    <EmptyData v-else :title="textEmpty">
      <router-link v-if="routeNew && textNew" :to="{name: routeNew}" class="btn btn-primary">
        {{ textNew }}
      </router-link>
    </EmptyData>
  </div>
</template>

<script>
import EmptyData from '@/components/EmptyData'
import Paginator from '@/components/Paginator'

export default {
  name: 'TableSimple',
  components: {
    Paginator,
    EmptyData
  },
  props: {
    textEmpty: {
      type: String,
      default: ''
    },
    items: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      default: () => []
    },
    paginator: {
      type: Object,
      default: () => {
        return {
          per_page: null,
          page: null,
          total: null
        }
      }
    },
    routeNew: {
      type: String,
      default: null
    },
    textNew: {
      type: String,
      default: null
    },
    filter: {
      type: String,
      default: null
    }
  },
  computed: {
    localFields () {
      if (this.selectable) {
        return ['selected', ...this.fields]
      }
      return this.fields
    }
  },
  watch: {
    //items(newVal, oldVal) {
    items (newVal) {
      if (newVal.length === 0) {//} || this.items !== this.selected){
        this.selectAll = false
      }
    }
  },
  data () {
    return {
      ref: null,
      selectAll: false,
      selected: []
    }
  },
  mounted () {
    this.ref = this._uid
  },
  methods: {
    async onRowSelected (checked) {
      if (Array.isArray(checked)) {
        if (this.selectAll) {
          this.selected = []
        } else {
          this.selected = this.items
        }
      } else {
        if (checked.rowSelected) {
          this.selected = this.selected.filter(i => i.id !== checked.id)
        } else {
          this.selected = [...this.selected, checked]
        }
      }

      this.$emit('select', this.selected)
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .badge-danger {
  background-color: #ffe1de;
  color: #e74a3b;
}

/deep/ .badge-success {
  background-color: #d8fbee;
  color: #1cc88a;
}
</style>
