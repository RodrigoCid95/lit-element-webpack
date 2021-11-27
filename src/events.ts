export class Events {
  static addEventListener(nameEvent: string, callback: any) {
    document.querySelector('app-root')?.addEventListener(nameEvent, callback, false)
  }
  static dispatchEvent(nameEvent: string, detail: any) {
    document.querySelector('app-root')?.dispatchEvent(new CustomEvent(nameEvent, { detail, bubbles: true, cancelable: true }))
  }
  static removeEventListener(nameEvent: string, callback: any) {
    document.querySelector('app-root')?.removeEventListener(nameEvent, callback, false)
  }
}