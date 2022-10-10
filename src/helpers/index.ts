export const toLocaleString = (num: number | string): string =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

export const removeSpaces = (num:number | string): string => num.toString().replace(/\s/g, "");
