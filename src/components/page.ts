import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _page from './../../styles/components/_page.sass'

@customElement('app-page')
export default class AppPage extends LitElement {
  static styles = _page
  render() {
    return html`
      <slot class="page"></slot>
    `
  }
}