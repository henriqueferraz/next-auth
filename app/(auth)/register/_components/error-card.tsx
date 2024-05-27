'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Button,
    buttonVariants
} from "@/components/ui/button"
import { CircleX } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"


export default function ErrorCard({
    errorMessage,
    reset
}: {
    errorMessage: string
    reset: () => void
}) {
    return (
        <>
            <Card className="mx-auto max-x-96 border-red-700">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-4">
                        <CircleX />
                        Ops...
                    </CardTitle>
                    <CardDescription>Ocorreu um erro</CardDescription>
                </CardHeader>
                <CardContent className="underline">{errorMessage}</CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant={'outline'} onClick={reset}>
                        Tentar Novamente
                    </Button>
                </CardFooter>
            </Card>
            <Link
                className={cn(buttonVariants({ variant: 'link' }), 'mt-8')}
                href='/'
            >
                Voltar para a Home
            </Link>
        </>
    )
}