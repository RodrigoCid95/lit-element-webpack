import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Events } from '../events'
import '../components/page'
import '../components/header'
import '../components/menu'
import './../components/content'
import './../components/footer'
import _general from './../styles/_general.sass'

@customElement('page-2')
export default class Page2 extends LitElement {
  static styles = _general
  private items = [
    { text: 'Page 1', action: () => Events.dispatchEvent('go', '/page1') }
  ]
  static param: string
  public static init() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, 5000)
    })
  }
  render() {
    return html`
      <app-page>
        <app-header>
          <app-menu backButton .items=${this.items} title="Page 2"></app-menu>
        </app-header>
        <app-content>
          <h1>${Page2.param}</h1>
        </app-content>
        <app-footer></app-footer>
      </app-page>
    `
  }
}