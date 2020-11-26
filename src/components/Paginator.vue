<template>
    <div class="paginator d-flex justify-content-around m-1">
        <b-btn variant="link" @click="changePage(page-1)">Anterior</b-btn>
        <div class="d-flex">
            <span class="m-auto pr-2">Página</span>
            <b-input :max="totalPages" type="number" v-model="local_page" @change="changePage(local_page)" />
            <span class="m-auto pl-2 order-3" style="white-space: nowrap;">{{ `de ${totalPages}`  }}</span>
        </div>
        <b-btn variant="link" @click="changePage(page+1)">Próxima</b-btn>
        <div class="d-inline-flex">
            <b-select :options="perPageOptions" v-model="per_page" @change="changePerPage(per_page)" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Paginator",
        props: {
            perPage:{
                type: Number,
                default: 10
            },
            page:{
                type: Number,
                default: 0
            },
            total:{
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                local_page: 1,
                per_page: 10
            }
        },
        computed: {
            perPageOptions() {
                return [
                    {
                        text: '10 por página',
                        value: 10
                    },
                    {
                        text: '20 por página',
                        value: 20
                    },
                    {
                        text: '30 por página',
                        value: 30
                    },
                    {
                        text: '40 por página',
                        value: 40
                    },
                    {
                        text: '50 por página',
                        value: 50
                    }
                ]
            },
            totalPages() {
                if (!this.total) return 0
                if (this.total % this.per_page === 0) {
                    return this.total / this.per_page
                }
                return Math.floor(this.total/this.per_page) + 1
            }
        },
        mounted() {
            this.per_page = this.perPage
            this.local_page = this.page
        },
        methods: {
            changePage(page) {
                page = parseInt(page)
                if (page <= 0 || page > this.totalPages) {
                    this.local_page = this.page
                    return
                }
                this.local_page = page
                this.$emit('change', {
                    page: page,
                    per_page: this.per_page
                })
            },
            changePerPage(per_page) {
                // if (1 > this.total/per_page) return
                this.per_page = per_page
                this.local_page = 1
                this.$emit('change', {
                    page: this.local_page,
                    per_page: per_page
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@media all and (max-width: 768px) {
  .paginator {
    flex-wrap: wrap !important;
    div.d-flex { order: 3; }
    div.d-inline-flex { order: 4; margin-top: 1rem; }
  }
}
</style>
