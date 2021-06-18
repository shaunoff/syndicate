import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetWin = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetWin), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const win = await db.win.findFirst({ where: { id } })

  if (!win) throw new NotFoundError()

  return win
})
