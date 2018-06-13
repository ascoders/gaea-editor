export function hasClass(obj: HTMLElement, cls: string) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function removeClass(obj: HTMLElement, cls: string) {
  if (hasClass(obj, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

export function addClass(obj: HTMLElement, cls: string) {
  if (!hasClass(obj, cls)) {
    obj.className === '' ? (obj.className = `${cls}`) : (obj.className += ` ${cls}`);
  }
}
