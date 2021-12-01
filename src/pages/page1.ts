import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Events } from '../events'
import '../components/page'
import '../sections/header'
import '../components/menu'
import '../sections/content'
import '../components/img'
import '../sections/footer'
import _page1 from './../../styles/pages/_page1.sass'

@customElement('page-1')
export default class Page1 extends LitElement {
  static styles = _page1
  private items = [
    { text: 'Page 2', action: () => Events.dispatchEvent('go', '/page2/Hello%20World!') }
  ]
  private sources1 = {
    xs: 'https://picsum.photos/400/300?grayscale',
    md: 'https://picsum.photos/800/600?grayscale'
  }
  private sources2 = {
    xs: 'https://picsum.photos/400/300?grayscale&blur=2',
    md: 'https://picsum.photos/800/600?grayscale&blur=2'
  }
  render() {
    return html`
    <app-page>
      <app-header>
        <app-menu backButton .items=${this.items} title="Page 1"></app-menu>
      </app-header>
      <app-content>
        <section class="row center">
          <div class="col-12 col-md-6">
            <app-img .sources=${this.sources1}></app-img>
          </div>
          <div class="col-12 col-md-6">
            <app-img .sources=${this.sources2}></app-img>
          </div>
        </section>
      </app-content>
      <app-footer></app-footer>
    </app-page>
    `
  }
}