import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _header from './../../styles/sections/_header.sass'
import { Events } from '../events'

@customElement('app-header')
export default class AppHeader extends LitElement {
  static styles = _header
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