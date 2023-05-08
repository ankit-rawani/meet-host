"use client";
import { auth, db } from "@/firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

type AuthContextType = {
    user: (User & { admin: boolean }) | null;
    login: (email: string, password: string) => unknown;
    register: (email: string, password: string, name: string) => unknown;
    logout: () => unknown;
};

export const AuthContext = createContext<AuthContextType>({
    login: () => null,
    logout: () => null,
    register: () => null,
    user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<(User & { admin: boolean }) | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { showToast } = useToast();

    const login = async (email: string, password: string) => {
        let result = null,
            error = null;
        try {
            result = await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            error = e;
        }

        return { result, error };
    };

    const register = async (email: string, password: string, name: string) => {
        let result = null,
            error = null;

        try {
            result = await createUserWithEmailAndPassword(auth, email, password);

            const docRef = await addDoc(collection(db, "users"), {
                name,
                email,
                admin: false,
            });

            result = { ...result, docRef };
        } catch (e) {
            error = e;
        }

        return { result, error };
    };

    const logout = async () => {
        let result = null,
            error = null;
        try {
            result = await signOut(auth);
            if (auth.currentUser)
                getDocs(
                    query(collection(db, "users"), where("email", "==", auth.currentUser.email))
                ).then((refs) => {
                    if (refs.docs.length !== 0) {
                        updateDoc(refs.docs[0].ref, {
                            isLogged: false,
                        });

                        setLoading(false);
                    }
                });
        } catch (e) {
            error = e;
        }

        return { result, error };
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                getDocs(query(collection(db, "users"), where("email", "==", user.email))).then(
                    (refs) => {
                        if (refs.docs.length !== 0) {
                            const data = refs.docs[0].data();
                            showToast("Authenticated as " + data.email);

                            updateDoc(refs.docs[0].ref, {
                                isLoggedIn: true,
                                loggedInAt: new Date(),
                                timeLeft: 60000, // milliseconds
                            })
                                .then(() => {
                                    if (data.admin) {
                                        setUser({ ...user, admin: true });
                                        router.push("/admin");
                                    } else {
                                        setUser({ ...user, admin: false });
                                        router.push("/dashboard");
                                    }

                                    setLoading(false);
                                })
                                .catch(() => {
                                    showToast("Login failed, refresh to try again", "error");
                                });
                        } else {
                            showToast("Login failed", "error");
                            setLoading(false);
                        }
                    }
                );
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {loading ? (
                <div className="text-center pt-12">
                    <Spinner aria-label="Extra large spinner example" size="xl" />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
