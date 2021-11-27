import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Events } from './events'
import './router'

declare var window: any

@customElement('app-root')
export class AppRoot extends LitElement {
  connectedCallback() {
    super.connectedCallback()
    const eventList = [{name: 'xs', size: '0px'}, {name: 'sm', size: '576px'}, {name: 'md', size: '768px'}, {name: 'lg', size: '992px'}, {name: 'xl', size: '1200px'}, {name: 'xxl', size: '1400px'}]
    for (const {name, size} of eventList) {
      const wm: MediaQueryList = window.matchMedia(`(min-width: ${size})`)
      if (wm.matches) {
        window.currentSize = {name, size}
      }
      wm.addEventListener('change', ({matches}: MediaQueryListEvent) => {
        Events.dispatchEvent(name, {nameEvent: name, matches})
        if (matches) {
          window.currentSize = {name, size}
          Events.dispatchEvent('resize', name)
        } else {
          const eventIndex = eventList.findIndex(event => event.name === name)
          const event = eventList[eventIndex - 1]
          window.currentSize = {name: event.name, size}
          Events.dispatchEvent('resize', event.name)
        }
      })
    }
  }
  render() {
    return html`
      <app-router
        .routes=${[
          { path: '/', tag: () => html`<page-index></page-index>`, component: () => import(/* webpackChunkName: "pages-index" */ './pages/index'), title: 'LitElement' },
          { path: '/page1', tag: () => html`<page-1></page-1>`, component: () => import(/* webpackChunkName: "pages-1" */ './pages/page1'), title: 'Page 1' },
          { path: '/page2/:s|param', tag: () => html`<page-2></page-2>`, component: () => import(/* webpackChunkName: "pages-2" */ './pages/page2'), title: 'Page 2' },
        ]}
      ></app-router>
    `
  }
}