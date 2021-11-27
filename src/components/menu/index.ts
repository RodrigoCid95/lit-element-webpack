import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Events } from './../../events'
import _styles from './_styles.sass'

@customElement('app-menu')
export default class AppMenu extends LitElement {
  static styles = _styles
  @property({ type: Array }) items: Item[] = []
  @property({ type: String }) title: string = ''
  @property({ type: Boolean }) backButton: boolean = false
  render() {
    return html`
      <nav class="app-menu">
        <ul class="menu-list">
          ${this.backButton ? html`<li @click=${()=> Events.dispatchEvent('go', '/')}>Atrás</li>` : ''}
          ${this.items.map(item => html`<li @click=${item.action}>${item.text}</li>`)}
        </ul>
        ${this.title ? html`<h1 class="menu-title">${this.title}</h1>` : ''}
      </nav>
    `
  }
}
type Item = {
  text: string
  action: () => void
}