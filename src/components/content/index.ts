import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _styles from './_styles.sass'

@customElement('app-content')
export default class AppContent extends LitElement {
  static styles = _styles
  render() {
    return html`
      <main class="content">
        <slot></slot>
      </main>
    `
  }
}