import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Events } from './../events'
import '../components/page'
import '../sections/header'
import '../components/menu'
import '../sections/content'
import '../components/dropdown'
import '../sections/footer'
import _index from './../../styles/pages/_index.sass'

@customElement('page-index')
export default class PageIndex extends LitElement {
  static styles = _index
  private items = [
    { text: 'Page 1', action: () => {
      Events.dispatchEvent('go', '/page1')
    } },
    { text: 'Page 2', action: () => {
      Events.dispatchEvent('go', '/page2/Hello%20World!')
    } },
  ]
  render() {
    return html`
      <app-page>
        <app-header>
          <app-menu .items=${this.items}></app-menu>
        </app-header>
        <app-content>
          <section class="row center">
            <div class="order-0 col-10 offset-1">
              <app-dropwown value="Select one..." @onChange=${(e: any) => console.log(e.detail.value)}>
                <app-dropdown-option value="value1">Value 1</app-dropdown-option>
                <app-dropdown-option value="value2">Value 2</app-dropdown-option>
              </app-dropwown>
            </div>
          </section>
        </app-content>
        <app-footer></app-footer>
      </app-page>
    `
  }
}