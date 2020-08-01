import LojaRepository from '@/repositories/Loja'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('loja', LojaRepository)

export default store
