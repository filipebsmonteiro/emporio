import UsuarioRepository from '@/repositories/Usuario'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('usuario', UsuarioRepository)

export default store
