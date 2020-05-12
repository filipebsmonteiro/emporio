import TokenService from '@/api/token'

export const isAuthenticatedPainel = ($to, $from, $next) => {
  if (
    TokenService._isAuthenticated()
    && TokenService._getDomain()
    && TokenService._getDomain() === '/painel'
  ){
    return $next()
  }
  $next({ name: 'painel.login' })
}
export const isAuthenticatedSite = ($to, $from, $next) => {
  if (TokenService._isAuthenticated()){
    return $next()
  }
  $next({ name: 'cliente.login' })
}

export const redirectLogin = (url=null) => {
  if (url && url.indexOf('/painel') > -1) {
    window.location.href = `${window.location.origin}/painel/login`
    return
  }
  window.location.href = `${window.location.origin}/login`
}
