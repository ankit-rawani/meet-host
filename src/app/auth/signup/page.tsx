"use client";
import { useAuth } from "@/context/AuthContext";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

function Page() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const { register } = useAuth();

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        const { error } = (await register(email, password, name)) as { error: object | null };

        if (error) {
            return console.log(error);
        }

        setLoading(false);

        return router.push("/dashboard");
    };

    return (
        <div className="min-h-screen mx-auto bg-slate-100 flex flex-col items-center justify-center">
            <div className="form-wrapper p-10 rounded-lg bg-white shadow-lg flex flex-col gap-6">
                <h1 className="text-4xl font-bold">Sign up</h1>
                <form onSubmit={handleForm} className="flex flex-col gap-4 w-72">
                    <div>
                        <Label htmlFor="name" value="Display Name" />
                        <TextInput
                            id="name"
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            placeholder="John"
                        />
                    </div>
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
                            placeholder="Password"
                            id="password"
                        />
                    </div>
                    <Button type="submit" color="purple" disabled={loading}>
                        {loading && <Spinner className="mr-2" aria-label="loading" />}
                        Sign up
                    </Button>
                    <Link href="/auth/signin" className="text-xs font-bold text-center">
                        Already have an account? Sign in now!
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Page;
