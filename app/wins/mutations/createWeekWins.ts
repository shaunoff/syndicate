import { resolver } from "blitz"
import db, { User, Win } from "db"
import { z } from "zod"

const Wins = z
  .object({
    userId: z.number(),
    week: z.number(),
  })
  .array()

// const testy = z.array({
//   id: z.number(),
// })

export default resolver.pipe(
  resolver.zod(Wins),
  //resolver.authorize(),
  async (wins) => {
    wins.forEach(async ({ userId, week }) => {
      await db.win.create({ data: { userId, amount: 0, paid: false, week } })
      // user.wins.forEach(async ({ id, week, amount, paid }) => {
      //   if (amount > 0) {
      //     try {
      //       await db.win.update({ where: { id }, data: { week, amount, paid } })
      //     } catch (e) {
      //       console.log("error", e)
      //     }
      //   }
      // })
    })
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    //const win = await db.win.update({ where: { id }, data })
    return null
  }
)
