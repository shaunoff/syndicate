import { resolver } from "blitz"
import db, { User } from "db"

export type NormalizedWin = {
  amount: number
  week: number
  paid: boolean
  runningTotal: number
}

export type UserWinData = {
  user: User
  total: number
  wins: NormalizedWin[]
}

export default resolver.pipe(
  //resolver.authorize(),
  async () => {
    const groupWins = await db.win.findMany({
      orderBy: {
        week: "asc",
      },
      include: {
        user: true,
      },
    })

    const wins = groupWins.reduce<Record<number, UserWinData>>((acc, win) => {
      const { amount, week, paid, userId, user } = win
      const userData = acc[userId]
      if (!userId) {
        return acc
      }
      if (!userData) {
        const initialData: UserWinData = {
          user,
          total: amount,
          wins: [
            {
              amount,
              week,
              paid,
              runningTotal: amount,
            },
          ],
        }
        return {
          ...acc,
          [userId]: initialData,
        }
      } else {
        const { total, wins } = userData
        const previousWin = [...wins].pop()
        const updatedWins: NormalizedWin[] = [
          ...wins,
          {
            amount,
            week,
            paid,
            runningTotal: (previousWin?.runningTotal || 0) + amount,
          },
        ]

        const newData = {
          user,
          total: total + amount,
          wins: updatedWins,
        }
        return {
          ...acc,
          [userId]: newData,
        }
      }
    }, {})
    return wins
  }
)
