import { User, Win } from "db"
import { string } from "zod"

type testy = (User & {
  wins: Win[]
})[]

type UserWins = Record<string, { id: number; name: string; wins: Record<string, number> }>

export const normalizeGetWins = (data: testy): UserWins => {
  console.log("eeee", data)
  let newData = {}
  data.forEach(
    (user) =>
      (newData[user.id] = {
        id: user.id,
        name: user.name,
        wins: user.wins.reduce((wins, { id, amount, week }) => {
          wins[id] = {
            id,
            amount,
            week,
          }
          return wins
        }, {}),
      })
  )
  console.log(newData)
  return newData
}
