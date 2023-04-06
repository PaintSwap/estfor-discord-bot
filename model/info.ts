async function createCommandsMessage() {
  let message = '';
  message += `**/leaderBoard** Show the leaderboard overall or for a specific skill \n`;
  message += `**/player** Show info about a player \n`;
  message += `**/global-stats** Show global stats \n`;
  message += `**/list-commands** Shows list of bot commands \n`;
  return message;
}

export { createCommandsMessage };