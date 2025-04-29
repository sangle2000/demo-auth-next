'use client';

import { auth } from "@/actions/auth-action";
import Link from "next/link";
import { useActionState } from "react";

export default function AuthForm({ mode }: { mode: string }) {
    const [formState, formAction] = useActionState(auth.bind(null, mode), {errors: {}})

    return (
        <form id="auth-form" action={formAction}>
            <div>
                <img src="/images/auth-icon.jpg" alt="A lock icon" />
            </div>
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </p>
            {
                formState?.errors && <ul id="form-errors">
                    {Object.keys(formState.errors).map((error) => {
                        return <li key={error}>{formState.errors[error as "email" | "password"]}</li>
                    })}
                </ul>
            }
            <p>
                <button type="submit">
                    {
                        mode === 'login' ? "Login" : "Create An Account"
                    }
                </button>
            </p>
            <p>
                {
                    mode === "login" ? <Link href="?mode=signup">Create An Account</Link> : <Link href="?mode=login">Login with existing account</Link>
                }
            </p>
        </form>
    )
}