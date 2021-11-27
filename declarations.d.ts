declare type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
declare type Win = Window
declare interface Window extends Win {
  currentSize: {
    name: Size
    size: string
  }
}
declare module "*.sass" {
  const content: CSSStyleSheet;
  export default content;
}
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"