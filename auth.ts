import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import { compareSync } from "bcrypt-ts"

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    providers: [credentials({
        credentials: {
            email: {
                label: 'E-mail:'
            },
            password: {
                label: 'Senha:',
                type: 'password'
            }
        },
        async authorize(credentials) {
            const email = credentials.email as string
            const password = credentials.password as string

            if (!email || !password) {
                return null
            }
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) return null

            const matches = compareSync(password, user.password)

            if (matches) {
                return { id: user.id, name: user.name, email: user.email }
            }
            return null
        }
    })],
})