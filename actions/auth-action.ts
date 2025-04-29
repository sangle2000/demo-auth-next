"use server";

import { redirect } from "next/navigation";

import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { isSqliteUniqueError } from "@/errors/catch-error";
import { createAuthSession, destroySession } from "@/lib/auth";

export async function signUp(state: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    let errors: {email?: string, password?: string} = {}

    if (!email.includes("@")) {
        errors.email = "Please enter valid email"
    }

    if (password.trim().length < 8) {
        errors.password = "Password have been least 8 characters"
    }

    console.log(errors)

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        }
    }

    const hashedPassword = hashUserPassword(password)
    try {
        const userId = createUser(email, hashedPassword).toString()
        await createAuthSession(userId)
        redirect('/training')
    } catch (error: unknown) {
        if (isSqliteUniqueError(error)) {
            return {
                errors: {
                    email: 'It seems like an account for the chosen email already exists.'
                }
            }
        }
        throw error
    }
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const existingUser = getUserByEmail(email)

    if (!existingUser) {
        return {
            errors: {
                email: "Could not authenticate user, please check your credentials"
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password, password)

    if (!isValidPassword) {
        return {
            errors: {
                password: "Could not authenticate user, please check your credentials"
            }
        }
    }

    await createAuthSession(existingUser.id)
    redirect("/training")
}

export async function auth(mode: string, prevState: any, formData: FormData) {
    if (mode === "login") {
        return login(prevState, formData)
    }

    return signUp(prevState, formData)
}

export async function logout() {
    await destroySession()

    redirect("/?mode=login")
}