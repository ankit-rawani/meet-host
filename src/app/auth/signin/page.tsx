"use client";
import { useAuth } from "@/context/AuthContext";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

function Page() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const { login } = useAuth();

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const { error } = (await login(email, password)) as { error: object | null };

        if (error) {
            return console.log(error);
        }

        setLoading(false);
        return router.push("/dashboard");
    };
    return (
        <div className="min-h-screen mx-auto bg-slate-100 flex flex-col items-center justify-center">
            <div className="form-wrapper p-10 rounded-lg bg-white shadow-lg flex flex-col gap-6">
                <h1 className="text-4xl font-bold">Sign in</h1>
                <form onSubmit={handleForm} className="flex flex-col gap-4 w-64">
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="example@mail.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <Button type="submit" color="purple" disabled={loading}>
                        {loading && <Spinner className="mr-2" aria-label="loading" />}
                        Sign in
                    </Button>
                    <Link href="/auth/signup" className="text-xs font-bold text-center">
                        Don&apos;t have an account? Sign up now!
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Page;
