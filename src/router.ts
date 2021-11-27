import { LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html } from 'lit/static-html.js'
import { Events } from './events'
import './components/loading'

declare var window: any

@customElement('app-router')
export class AppRouter extends LitElement {
  tag: undefined | null | Tag = undefined
  @property({ type: Array }) routes: Route[] = []
  private setPage(path: string, skipHistory = false) {
    let params: Params = {}
    const route = this.routes.find(route => {
      const segmentsRoute = route.path.split('/')
      const segmentsPath = path.split('/')
      if (segmentsRoute.length !== segmentsPath.length) {
        return false
      }
      const possibleParameters: Params = {}
      let pass = true
      for (let x = 0; x < segmentsPath.length; x++) {
        const segmentPath = segmentsPath[x]
        const segmentRoute = segmentsRoute[x]
        if (segmentPath !== segmentRoute) {
          if (segmentRoute[0] === ':') {
            const key = segmentRoute.substr(1)
            if (key.includes('|')) {
              const segmentsKey = key.split('|')
              const type = segmentsKey[0]
              segmentsKey.shift()
              const value = segmentsKey.join('|')
              switch (type) {
                case 'i':
                  const resultInt = parseInt(segmentPath)
                  if (isNaN(resultInt)) {
                    pass = false
                    break
                  }
                  possibleParameters[value] = resultInt
                  break
                case 'f':
                  const resultFloat = parseFloat(segmentPath)
                  if (isNaN(resultFloat)) {
                    pass = false
                    break
                  }
                  possibleParameters[value] = resultFloat
                  break
                case 'b':
                  possibleParameters[value] = new Boolean(segmentPath).valueOf()
                  break
                default:
                  possibleParameters[value] = decodeURI(segmentPath)
                  break
              }
            } else {
              possibleParameters[key] = decodeURI(segmentPath)
            }
          } else {
            pass = false
            break
          }
        }
      }
      if (pass) {
        params = possibleParameters
      }
      return pass
    })
    if (route) {
      if (route.title) {
        document.title = route.title
      }
      if (!skipHistory) {
        history.pushState(null, route.title || '', path)
      }
      this.tag = undefined
      this.requestUpdate()
      route.component().then(async ({ default: mod }) => {
        if (params !== {}) {
          Object.keys(params).forEach(key => mod[key] = params[key])
        }
        if (mod.init) {
          await mod.init()
        }
        if (window.location.pathname === path) {
          this.tag = route.tag
          this.requestUpdate()
        }
      })
    } else {
      this.tag = null
      if (!skipHistory) {
        history.pushState(null, 'Página no encontrada', path)
      }
    }
  }
  connectedCallback() {
    super.connectedCallback()
    this.setPage(window.location.pathname, true)
    Events.addEventListener('go', (e: any) => {
      this.setPage(e.detail)
    })
    window.Events = Events
    window.onpopstate = () => {
      this.setPage(window.location.pathname, true)
    }
  }
  render() {
    switch (this.tag) {
      case undefined:
        return html`<app-loading></app-loading>`
      case null:
        return html`<span>Not found</span>`
      default:
        return this.tag()
    }
  }
}
type Route = {
  path: string
  tag: Tag
  component: () => Promise<{ default: any; }>
  title?: string
}
type Params = { [x: string]: number | string | boolean }
type Tag = () => TemplateResult<1>