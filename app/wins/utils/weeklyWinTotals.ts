import { UserWinData } from "app/wins/queries/getWinTotals"

const weeklyWinTotals = (users: Record<string, UserWinData>) => {
  const weeklyTotals: Record<number, number> = {}
  const userWins = Object.values(users).map((user) => user.wins)
  userWins.forEach((wins) => {
    wins.forEach((win, index) => {
      if (index in weeklyTotals) {
        const currentTotal = weeklyTotals[index] || 0
        weeklyTotals[index] = currentTotal + win.amount
      } else {
        weeklyTotals[index] = win.amount
      }
    })
  })
  return weeklyTotals
}

export default weeklyWinTotals
