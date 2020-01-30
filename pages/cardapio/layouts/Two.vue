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
        class="overflow-hidden"
        style="max-width: 540px;"
        no-body
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0" />
          </b-col>
          <b-col md="6">
            <b-card-body title="Horizontal Card">
              <b-card-text class="olaquerida">
                This is a wider card with supporting text as a natural lead-in to additional content.
                This content is a little bit longer.
                {{ produto }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Two',
  props: {
    produtos: {
      type: Array,
      default: () => []
    },
    productsPerLine: {
      type: Number,
      default: 2
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

<style lang="scss" scoped>
.olaquerida{
  background-color: $base-color;
}
</style>
