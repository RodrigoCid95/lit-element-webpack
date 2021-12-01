import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import _dropdown from './../../styles/components/_dropdown.sass'

@customElement('app-dropwown')
export class AppDropdown extends LitElement {
  static styles = _dropdown
  @property({ type: String }) value: string = ''
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('setPlaceholder', (e: any) => {
      this.value = e.detail.textContent
    })
  }
  render() {
    return html`
      <div class="content" @click=${() => this.shadowRoot?.querySelector('.content')?.classList.toggle('expand')}>
        <label>${this.value}</label>
        <div class="options">
          <slot></slot>
        </div>
      </div>
    `
  }
}
@customElement('app-dropdown-option')
export class AppDropdownOption extends LitElement {
  static styles = _dropdown
  @property({ type: String }) value: string = ''
  @property({ type: Boolean }) selected: boolean = false;
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', () => {
      this.parentElement?.dispatchEvent(new CustomEvent('setPlaceholder', {
        bubbles: true,
        cancelable: true,
        detail: { textContent: this.textContent }
      }))
      this.parentElement?.dispatchEvent(new CustomEvent('onChange', {
        bubbles: true,
        cancelable: true,
        detail: { value: this.value }
      }))
    })
  }
  render() {
    return html`
      <div class="item-content">
        <label>${this.textContent}</label>
      </div>
    `
  }
}