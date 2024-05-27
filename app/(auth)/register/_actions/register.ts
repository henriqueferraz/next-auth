'use server'

import prisma from '@/lib/prisma'
import { hashSync } from 'bcrypt-ts'
import { redirect } from 'next/navigation'


export default async function register(FormData: FormData) {

    const entries = Array.from(FormData.entries())
    const { name, email, password } = Object.fromEntries(entries) as {
        name: string
        email: string
        password: string
    }

    //Verificando se algum campo está vazio
    if (!name || !email || !password) {
        throw new Error('Preencha todos os campos')
    }

    //Verificando se o usuario já existe
    const userExists = await prisma.user.findUnique({
        where: { email }
    })
    if (userExists) {
        throw new Error('Usuário Já existe')
    }

    //Criar usuário na base
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })

    redirect('/')
}