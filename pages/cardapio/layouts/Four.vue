<template>
  <div>
    <b-card-group
      v-for="(linha, linhaIndex) in chunk(produtos)"
      :key="linhaIndex"
      class="mt-4"
      deck
    >
      <b-card
        v-for="produto in linha"
        :key="produto.id"
        title="Card Title"
        img-src="~/assets/image/25-600x300.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="p-0"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
          {{ produto }}
        </b-card-text>

        <b-button href="#" variant="primary">
          Go somewhere
        </b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Four',
  props: {
    produtos: {
      type: Array,
      default: () => []
    },
    productsPerLine: {
      type: Number,
      default: 4
    }
  },
  methods: {
    chunk (arr) {
      const chunks = []
      let i = 0
      const n = arr.length

      while (i < n) {
        chunks.push(arr.slice(i, i += this.productsPerLine))
      }

      return chunks
    }
  }
}
</script>

<style scoped>

</style>
