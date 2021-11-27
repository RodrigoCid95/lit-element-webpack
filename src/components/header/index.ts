import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _styles from './_styles.sass'
import { Events } from './../../events'

@customElement('app-header')
export default class AppHeader extends LitElement {
  static styles = _styles
  _click() {
    Events.dispatchEvent('go', '/users')
  }
  render() {
    return html`
      <header class="header">
        <slot></slot>
      </header>
    `
  }
}