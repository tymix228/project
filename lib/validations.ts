import { z } from 'zod'

// Schemat walidacji produktu (używany w formularzu admina)
export const productFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Nazwa musi mieć minimum 3 znaki')
    .max(100, 'Nazwa może mieć maksimum 100 znaków'),

  shortDescription: z
    .string()
    .min(10, 'Krótki opis musi mieć minimum 10 znaków')
    .max(160, 'Krótki opis może mieć maksimum 160 znaków'),

  description: z
    .string()
    .min(20, 'Opis musi mieć minimum 20 znaków'),

  price: z
    .number({ invalid_type_error: 'Podaj cenę' })
    .positive('Cena musi być większa od 0')
    .max(99999, 'Cena nie może przekraczać 99 999 PLN'),

  compareAtPrice: z
    .number()
    .positive('Stara cena musi być większa od 0')
    .optional()
    .or(z.literal(0).transform(() => undefined)),

  category: z.enum(['figurines', 'accessories', 'mods', 'terrain', 'cosplay', 'electronics'], {
    errorMap: () => ({ message: 'Wybierz kategorię' }),
  }),

  tags: z.array(
    z.enum(['bestseller', 'new', 'sale', 'limited', 'featured'])
  ).default([]),

  material: z.string().max(50).optional().or(z.literal('').transform(() => undefined)),

  printTime: z
    .number()
    .positive('Czas druku musi być większy od 0')
    .optional()
    .or(z.literal(0).transform(() => undefined)),

  stock: z
    .number({ invalid_type_error: 'Podaj stan magazynowy' })
    .int('Stan magazynowy musi być liczbą całkowitą')
    .min(0, 'Stan magazynowy nie może być ujemny'),

  isActive: z.boolean().default(true),

  isFeatured: z.boolean().default(false),
})

export type ProductFormValues = z.infer<typeof productFormSchema>

// Schemat logowania do admina
export const loginSchema = z.object({
  password: z
    .string()
    .min(1, 'Podaj hasło'),
})

export type LoginValues = z.infer<typeof loginSchema>
