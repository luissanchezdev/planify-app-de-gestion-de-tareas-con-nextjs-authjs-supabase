import { z } from "zod"

export const schemAddSpaceForm = z.object({
  title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres" }),
  description: z.string().min(10, { message: "La descripcion debe tener al menos 10 caracteres" }),
  tag: z.string().min(3, { message: "La etiqueta debe tener al menos 3 caracteres" })
})

export type TSchemaAddSpaceForm = z.infer<typeof schemAddSpaceForm>
