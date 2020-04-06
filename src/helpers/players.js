export function nameFromId(playerID, gameMetadata) {
  if (!gameMetadata) {
    return `${playerID}`;
  }
  const gameMetadataEntry = gameMetadata.find(e => `${e.id}` === `${playerID}`);
  return gameMetadataEntry.name;
}
