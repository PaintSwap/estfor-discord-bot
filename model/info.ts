async function createCommandsMessage() {
  let message = '';
  message += `**/leaderboard** Shows the player leaderboards \n`;
  message += `**/player** Shows info about a player \n`;
  message += `**/global-stats** Shows the global stats \n`;
  message += `**/top-clans** Shows the clan leaderboard \n`;
  message += `**/clan** Shows stats about a specific clan \n`;
  message += `**/list-commands** Shows list of bot commands \n`;
  return message;
}

export { createCommandsMessage };