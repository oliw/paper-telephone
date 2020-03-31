export class Entry {
  constructor(number) {
    this.number = number;
    this.writing = null;
    this.drawing = null;
    this.author = null;
  }
}

export function entryFilledIn(entry) {
  return entry.drawing != null || entry.writing != null;
}

export function entryNotFilledIn(entry) {
  return !entryFilledIn(entry);
}
