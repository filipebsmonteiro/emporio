<template>
    <div class="row align-items-center justify-content-center m-1">
        <b-btn class="col-md-3" variant="link" @click="changePage(page-1)">
            {{ $t('components.paginator.anterior') }}</b-btn>
        <div class="col-md-3 d-flex">
            <span class="m-auto pr-2">{{$t('components.paginator.pagina')}}</span>
            <b-input :max="totalPages" type="number" v-model="local_page" @change="changePage(local_page)" />
            <span class="m-auto pl-2" style="white-space: nowrap;">{{ $t('components.paginator.de') + ' ' + totalPages }}</span>
        </div>
        <b-btn class="col-md-3" variant="link" @click="changePage(page+1)">
            {{ $t('components.paginator.proxima') }}</b-btn>
        <div class="col-md-3 d-inline-flex">
            <b-select :options="perPageOptions" v-model="per_page" @change="changePerPage(per_page)" />
            <!-- <span>{{ total }}</span>-->
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
                        text: '10 ' + this.$t('components.paginator.por_pagina'),
                        value: 10
                    },
                    {
                        text: '20 ' + this.$t('components.paginator.por_pagina'),
                        value: 20
                    },
                    {
                        text: '30 ' + this.$t('components.paginator.por_pagina'),
                        value: 30
                    },
                    {
                        text: '40 ' + this.$t('components.paginator.por_pagina'),
                        value: 40
                    },
                    {
                        text: '50 ' + this.$t('components.paginator.por_pagina'),
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

<style scoped>

</style>
