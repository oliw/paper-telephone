export function nameFromId(playerID, gameMetadata) {
  if (!gameMetadata || !Array.isArray(gameMetadata)) {
    return `${playerID}`;
  }
  const gameMetadataEntry = gameMetadata.find(
    (e) => `${e.id}` === `${playerID}`
  );
  return gameMetadataEntry.name;
}

export function toColor(str) {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}
