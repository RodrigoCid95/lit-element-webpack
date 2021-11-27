import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _styles from './_styles.sass'

@customElement('app-page')
export default class AppPage extends LitElement {
  static styles = _styles
  render() {
    return html`
      <slot class="page"></slot>
    `
  }
}