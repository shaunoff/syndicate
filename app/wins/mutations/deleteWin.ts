import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteWin = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteWin), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const win = await db.win.deleteMany({ where: { id } })

  return win
})
