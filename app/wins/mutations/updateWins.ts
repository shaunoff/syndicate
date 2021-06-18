import { resolver } from "blitz"
import db, { User, Win } from "db"
import { z } from "zod"

const UpdateWins = z
  .object({
    id: z.number(),
    wins: z
      .object({
        id: z.number().optional(),
        amount: z.number(),
        week: z.number(),
      })
      .array(),
  })
  .array()

// const testy = z.array({
//   id: z.number(),
// })

export default resolver.pipe(
  resolver.zod(UpdateWins),
  //resolver.authorize(),
  async (
    data: (User & {
      wins: Win[]
    })[]
  ) => {
    data.forEach((user) => {
      user.wins.forEach(async ({ id, week, amount, paid }) => {
        if (amount > 0) {
          try {
            await db.win.update({ where: { id }, data: { week, amount, paid } })
          } catch (e) {
            console.log("error", e)
          }
        }
      })
    })
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    //const win = await db.win.update({ where: { id }, data })
    return null
  }
)
