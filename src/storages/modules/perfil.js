import PerfilRepository from '@/repositories/Perfil'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('perfil', PerfilRepository)

export default store
