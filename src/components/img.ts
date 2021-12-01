import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { Events } from '../events'
import _img from './../../styles/components/_img.sass'

@customElement('app-img')
export class AppImg extends LitElement {
  static styles = _img
  private loading = true
  private currentSrc: string = ''
  private tempImgs: { [x: string]: HTMLImageElement } = {}
  @property({ type: Object }) sources: Sources = {
    xs: 'https://picsum.photos/3000/2000.jpg?grayscale'
  }
  @property({ type: String }) alt: string = ''
  @property({ type: Object }) classes: Classes = {}
  private handlerResize = ({ size }: any) => this.setImage(size)
  connectedCallback() {
    super.connectedCallback()
    Events.addEventListener('resize', this.handlerResize)
    this.setImage()
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    Events.removeEventListener('resize', this.handlerResize)
  }
  private async setImage(size: Size = window.currentSize.name) {
    let indexSize = Object.keys(this.sources).indexOf(size)
    if (this.loading) {
      const prevSize = (currentSize: Size): Size => {
        const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
        const index = sizes.indexOf(currentSize)
        return sizes[index - 1]
      }
      while (indexSize === -1) {
        size = prevSize(size)
        indexSize = Object.keys(this.sources).indexOf(size)
      }
    }
    if (indexSize === -1) { return }
    const source = this.sources[size] || ''
    if (this.sources[size] !== '') {
      if (this.tempImgs[size] === undefined) {
        this.loading = true
        this.requestUpdate()
        const tempImg = new Image()
        this.tempImgs[size] = tempImg
        tempImg.src = source
        await new Promise(resolve => tempImg.onload = resolve)
        tempImg.remove()
        this.loading = false
        this.requestUpdate()
      }
      this.currentSrc = source
      this.requestUpdate()
    }
  }
  render() {
    if (this.loading) {
      return html`
      <div class="loading">
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
      </div>
      `;
    } else {
      const classList = {
        img: true,
        ...this.classes
      }
      return html`<img class=${classMap(classList)} src=${this.currentSrc} alt=${this.alt} />`;
    }
  }
}
export type Sources = {
  xs: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  xxl?: string
}
type Classes = {
  'fade-in'?: boolean
  'fade-left'?: boolean
  'fade-right'?: boolean
  center?: boolean
  'center-sm'?: boolean
}