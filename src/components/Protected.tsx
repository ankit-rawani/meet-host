"use client";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

function Protected({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) router.push("/auth/signin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            {!user ? (
                <div className="text-center pt-12">
                    <Spinner aria-label="Extra large spinner example" size="xl" />
                </div>
            ) : (
                children
            )}
        </>
    );
}

export default Protected;
