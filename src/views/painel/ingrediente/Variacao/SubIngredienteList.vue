<template>
  <b-card header-class="p-0" body-class="p-2" class="bg-translucent-info card-variacao">
    <template v-slot:header>
      <b-input-group>
        <b-input v-model="variacao.nome" placeholder="Nome da Variação" class="font-weight-bold"/>
        <i class="fas fa-times p-1 text-gray position-absolute" @click="$emit('remove', variacao)"/>
      </b-input-group>
    </template>

    <div class="row">
      <div class="col-md-4 col-sm-6 col-xs-6">
        <b-input v-model="variacao.quantidade_min" placeholder="Mínimo" type="number" min="0" class="font-weight-bold"
                 @change="$emit('update', variacao)"/>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-6">
        <b-input v-model="variacao.quantidade_max" placeholder="Máximo" type="number" min="0" class="font-weight-bold"
                 @change="$emit('update', variacao)"/>
      </div>
      <div class="col-md-4 d-flex align-items-center text-white">
        <b-check size="lg" v-model="variacao.obrigatorio" class="ml-md-4 p-md-0"
                 @change="$emit('update', variacao)" switch>Obrigatório
        </b-check>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-form-group label="Opções" label-class="text-white" class="mt-4 mb-0">
          <SelectIngredientes :model="opcao_model" @input="addSubingrediente" class="mb-2"/>
        </b-form-group>
        <b-table :fields="fields" :items="variacao.ingredientes" class="subtable-variacao" responsive>
          <template v-slot:cell(nome)="{ item: { nome, nesseMultiplo, preco } }">
            <div class="d-flex justify-content-between nome-sub-variacao">
              <span v-b-tooltip :title="nome">{{ nome }}</span>
              <span v-if="preco > 0" :class="{'text-through': nesseMultiplo && nesseMultiplo > 0}">{{ preco | formatMoney }}</span>
            </div>
          </template>
          <template v-slot:cell(preco)="{ item: { id, nesseMultiplo } }">
            <b-input-group class="align-items-center">
              <b-form-input class="input-opcao" type="number" step="0.01" min="0" size="sm"
                            v-model="nesseMultiplo" @change="evt => updateSubingrediente(id, 'nesseMultiplo', evt)"/>
            </b-input-group>
          </template>
          <template v-slot:cell(id)="{ item }">
            <i class="fas fa-times m-auto btn p-0 text-danger" @click="removeSubingrediente(item)"/>
          </template>
        </b-table>
      </div>
    </div>
  </b-card>
</template>

<script>
  import SelectIngredientes from '@/views/painel/ingrediente/SelectIngredientes'

  export default {
    name: 'SubIngredienteList',
    components: { SelectIngredientes },
    props: {
      variacao: {
        type: Object,
        default: () => {
        }
      }
    },
    data () {
      return {
        fields: [
          { key: 'nome', label: 'Nome' },
          { key: 'preco', label: 'Preço' },
          { key: 'id', label: '' }
        ],
        opcao_model: null
      }
    },
    methods: {
      addSubingrediente (opcao) {
        if (opcao) {
          if (!this.variacao.ingredientes.find(i => i.id === opcao.id)) {
            opcao = { id: opcao.id, nome: opcao.nome, preco: opcao.preco, nesseMultiplo: null }
            this.variacao.ingredientes = [...this.variacao.ingredientes, opcao]
            this.opcao_model = null
            this.$emit('update', this.variacao)
          }
          this.$notify({
            type: 'success',
            title: 'Adicionado !',
            timeout: 1000,
            verticalAlign: 'bottom'
          })
        }
      },
      updateSubingrediente (id, key, value) {
        this.variacao.ingredientes = this.variacao.ingredientes.map(ing => {
          if (ing.id === id) {
            ing[key] = value
          }
          return ing
        })
        this.$emit('update', this.variacao)
      },
      removeSubingrediente (opcao) {
        this.variacao.ingredientes = this.variacao.ingredientes.filter(i => i.id !== opcao.id)
        this.$emit('update', this.variacao)
      },
    },
    mounted () {
      this.variacao.obrigatorio = !!this.variacao.obrigatorio
    }
  }
</script>

<style lang="scss" scoped>
  .card-variacao {
    .card-header {
      input {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      i.fa-times {
        right: 2px;
        cursor: pointer;
      }
    }

    .subtable-variacao {
      max-height: 30vh !important;

      /*SCROLLBAR*/
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
      }

      &::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #AAA;
        border-radius: 10px;
      }

      /* END SCROLLBAR */

      /deep/ table td {
        padding: 0.25rem !important;

        .nome-sub-variacao span {
          max-width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    /deep/ .custom-control-label {
      &::before {
        background-color: transparent;
        border: #fff solid 1px;
      }

      &::after {
        background-color: #fff;
      }
    }

    /deep/ .custom-control-input:checked ~ .custom-control-label::before {
      color: #fff;
      border-color: #fff;
      background-color: #ffffff69;
    }

  }

  /deep/ .list-inline-item {
    margin: 0.2rem;
  }

  .input-opcao {
    background-color: transparent;
    border-color: transparent;
    color: #525f7f;
    padding: 0 !important;
    width: 7rem;

    &:hover, &:focus {
      border-color: #f7fafc !important;
    }
  }
</style>
