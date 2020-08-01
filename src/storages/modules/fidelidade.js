import FidelidadeRepository from '@/repositories/Fidelidade'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('fidelidade', FidelidadeRepository)

export default store
