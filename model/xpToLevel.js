const { EstforConstants } = require('@paintswap/estfor-definitions');

async function xpToLevel(xp) {
  const interval = EstforConstants.levelXp
  let level = 1
  for (let i = 0; i < interval.length; i++) {
    if (xp >= interval[i]) {
      level = i + 1
    }
  }
  return level
}

module.exports = { xpToLevel };