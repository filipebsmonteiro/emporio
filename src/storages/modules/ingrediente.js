import IngredienteRepository from '@/repositories/Ingrediente'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('ingrediente', IngredienteRepository)

export default store
