import { Move } from "./move.model"

export interface User {
    _id: string
    fullName: string
    coins: number
    moves: Move[]
}
