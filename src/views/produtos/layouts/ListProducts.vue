<template>
  <div>
    <b-card-group
      v-for="(line, lineIndex) in chunk(produtos)"
      :key="lineIndex"
      class="mt-4 row"
      deck
    >
      <!-- eslint-disable-next-line vue/require-component-is -->
      <Component
        v-bind:is="componentName"
        v-for="produto in line"
        :key="produto.id"
        :produto="produto"
      />
    </b-card-group>
  </div>
</template>

<script>
  import Two from './Two'
  import Four from './Four'

  export default {
    name: 'ListProducts',
    props: {
      produtos: {
        type: Array,
        default: () => []
      },
      produtosPorLinha: {
        type: Number,
        default: 4
      }
    },
    computed: {
      componentName () {
        switch (this.produtosPorLinha) {
          case 2:
            return Two
          case 4:
            return Four
          default:
            return Four
        }
      }
    },
    methods: {
      chunk (arr) {
        const chunks = []
        let i = 0
        const n = arr.length
        while (i < n) {
          chunks.push(arr.slice(i, i += this.produtosPorLinha))
        }
        return chunks
      }
    }
  }
</script>

<style scoped>
</style>
