export function trim(str) {
  return str.replace(/\r\n/g, '\n').replace(/^\s+|\s+$/, '');
}