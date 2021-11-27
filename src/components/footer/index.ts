import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import _styles from './_styles.sass'

@customElement('app-footer')
export default class AppFooter extends LitElement {
  static styles = _styles
  render() {
    return html`
      <footer class="footer">
        <div class="content">
          <slot></slot>
        </div>
        <div class="copyright">
          <a href="https://github.com/RodrigoCid95" target="_blank">
            <span>@RodrigoCid95</span>
          </a>
        </div>
      </footer>
    `
  }
}