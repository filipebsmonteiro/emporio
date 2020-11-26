import APIService from '@/api/APIService'

export const isAuthenticatedPainel = ($to, $from, $next) => {
  if (APIService._isAuthenticated() && APIService._getDomain() && APIService._getDomain() === 'painel') {
    return $next()
  }
  $next({ name: 'painel.login' })
}
export const isAuthenticatedSite = ($to, $from, $next) => {
  if (APIService._isAuthenticated()) {
    return $next()
  }
  $next({ name: 'site.login' })
}

export const redirectLogin = () => {
//export const redirectLogin = (url = null) => {
  //if (url && url.indexOf('/painel') > -1) {
  //  window.location.href = `${window.location.origin}/painel/login`
  //  return
  //}

  if (
    window.location.href !== `${window.location.origin}/login` &&
    window.location.href !== `${window.location.origin}/painel/login`
  ){
    window.location.href = `${window.location.origin}/login`
  }
}
