import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _content from './../../styles/sections/_content.sass'

@customElement('app-content')
export default class AppContent extends LitElement {
  static styles = _content
  render() {
    return html`
      <main class="content">
        <slot></slot>
      </main>
    `
  }
}