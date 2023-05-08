"use client";

import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { db } from "@/firebase";
import { ParticipantType } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

function Page() {
    const { showToast } = useToast();
    const { logout } = useAuth();
    const [participants, setParticipants] = useState<ParticipantType[]>([]);

    useEffect(() => {
        const q = query(collection(db, "users"), where("isLoggedIn", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const p: ParticipantType[] = [];
            querySnapshot.forEach((doc) => {
                p.push(doc.data() as ParticipantType);
            });

            p.sort((a, b) => a.loggedInAt.toMillis() - b.loggedInAt.toMillis());
            setParticipants(p);
            console.log(p);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="wrapper">
            Dashboard
            <Button onClick={() => showToast("Fireeeeeee", "fire")}>Show</Button>
            <Button onClick={() => logout()}>Logout</Button>
            {JSON.stringify(participants)}
        </div>
    );
}

export default Page;
