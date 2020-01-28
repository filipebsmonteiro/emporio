import { setup } from 'axios-cache-adapter'
import localforage from 'localforage'
import { CancelToken, Cancel } from 'axios'
import qs from 'qs'
import * as repositories from '~/api'

export default (ctx, inject) => {
  const token = 'asdfasdfasdf'// ctx.app.$cookies.get('auth._token.local')
  let headers
  if (token) {
    headers = {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }

  const cache = localforage.createInstance({
    // List of drivers used
    driver: [
      localforage.LOCALSTORAGE/*,
      memoryStorageDriver._driver */
    ],
    // Prefix all storage keys to prevent conflicts
    name: 'cache.'
  })

  // Create `axios-cache-adapter` instance
  let api = setup({
    baseURL: 'localhost', // ctx.app.$env.ROTA_API,
    headers,
    cache: {
      // {Number} Maximum time for storing each request in milliseconds,
      // defaults to 15 minutes when using `setup()`.
      maxAge: 60 * 60 * 1000,
      // {Object} An instance of localforage, defaults to a custom in memory store.
      // *Cannot be overridden per request*
      store: cache,
      // {Object} Define which kind of requests should be excluded from cache.
      exclude: {
        // {Boolean} Exclude requests with query parameters.
        query: false
      },
      // Invalidate only when a specific option is passed through config(cfg)
      invalidate: async (cfg, req) => {
        const method = req.method.toLowerCase()
        if (!!req.ignoreCache === true || method !== 'get') {
          await cfg.store.removeItem(cfg.uuid)
        }
      }
    }
  })

  if (process.server) {
    api = setup({
      baseURL: process.env.ROTA_API,
      headers,
      cache: {
        maxAge: 0,
        exclude: {
          query: false
        }
      }
    })
  }

  const last = []

  api.interceptors.response.use((response) => {
    let url = response.config.url
    if (response.config.url.includes('dashboard')) {
      url += `?${qs.stringify(response.config.params)}`
    }
    last.filter(f => f.url === url).forEach((item) => {
      last.splice(last.indexOf(item), 1)
    })
    return response
  }, (error) => {
    if (error instanceof Cancel) {
      last.filter(f => f.url === error.message).forEach((item) => {
        last.splice(last.indexOf(item), 1)
      })
    }
    return Promise.reject(error)
  })

  api.interceptors.request.use((config) => {
    try {
      const req = { url: [config.baseURL, config.url].join('/'), cancel: null }
      if (req.url.includes('dashboard')) {
        req.url += `?${qs.stringify(config.params)}`
      }
      const token = new CancelToken((c) => { req.cancel = c })
      last.filter(f => f.url === req.url).forEach((item) => {
        item.cancel(item.url)
      })

      last.push(req)

      if (config.method === 'get') {
        config.paramsSerializer = (params) => {
          Object.keys(params).forEach((p) => {
            if (params[p] === null || params[p] === undefined || (Array.isArray(params[p]) && params[p].length === 0)) {
              delete params[p]
            }
          })
          return qs.stringify(params, { arrayFormat: 'brackets' })
        }
      }
      config.cancelToken = token

      config.headers = { ...config.headers, Authorization: ctx.app.$cookies.get('auth._token.local') }

      return config
    } catch (e) {
      return config
    }
  })

  const repos = {}
  Object.keys(repositories).forEach((repositoryName) => {
    repos[repositoryName] = repositories[repositoryName](api)
  })
  inject('repositories', repos)
}
