import { Entry, entryFilledIn, entryNotFilledIn } from "./entry";

export function paperHasCompletedEntry(paper, entryNumber) {
  if (entryNumber < 0 || entryNumber >= paper.entries.length) {
    return false;
  }
  return entryFilledIn(paper.entries[entryNumber]);
}

export function unfilledEntry(paper) {
  return paper.entries.find(entry => entryNotFilledIn(entry));
}

export function latestEntry(paper) {
  return paper.entries
    .slice()
    .reverse()
    .find(entry => entryFilledIn(entry));
}

export class Paper {
  constructor(player, numEntries) {
    this.player = player;
    this.entries = Array(numEntries).fill(null);
    for (let i = 0; i < numEntries; i++) {
      this.entries[i] = new Entry(i);
    }
  }
}
