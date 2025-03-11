"use client"
import { z } from "zod"
import { WordType } from "../enum/wordtype.enum"

export const wordSchema = z.object({
    id: z.number(),
    englishWord: z.string().min(1, {
        message: "Tiếng anh không được để trống",
    }),
    wordType: z.nativeEnum(WordType),
    vietNamWord: z.string().min(1, {
        message: "Tiếng việt không được để trống",
    }),
})

export type Word = z.infer<typeof wordSchema>
export const wordDefault = {
    id: 0,
    englishWord: "",
    wordType: WordType.NOUN,
    vietNamWord: ""
}