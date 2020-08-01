import FormapagamentoRepository from '@/repositories/Formapagamento'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('formapagamento', FormapagamentoRepository)

export default store
