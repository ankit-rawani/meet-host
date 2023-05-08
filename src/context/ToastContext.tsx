"use client";
import { Toast } from "flowbite-react";
import { motion } from "framer-motion";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { HiCheck, HiExclamation, HiFire, HiX } from "react-icons/hi";

type ToastContextType = {
    showToast: (
        message: string,
        type?: "fire" | "info" | "error" | "success" | "warn",
        duration?: number
    ) => unknown;
};

export const ToastContext = createContext<ToastContextType>({
    showToast: () => null,
});

export const useToast = () => useContext(ToastContext);

export const ToastContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [type, setType] = useState("info");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);

    const showToast = (
        message: string,
        type?: "fire" | "info" | "error" | "success" | "warn",
        duration?: number
    ) => {
        setType(type || "info");
        setMessage(message);
        setShow(true);

        setTimeout(() => setShow(false), duration || 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {show && (
                <motion.div
                    layout
                    initial={{ opacity: 0, y: -48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        layout: { duration: 0.3 },
                    }}
                    className="absolute p-4 w-full top-0"
                >
                    <Toast className="shadow-lg mx-auto" onClick={() => setShow(false)}>
                        {type === "success" && (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                        )}
                        {type === "info" && (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                        )}
                        {type === "error" && (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiX className="h-5 w-5" />
                            </div>
                        )}
                        {type === "warn" && (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-500 dark:bg-orange-700 dark:text-orange-200">
                                <HiExclamation className="h-5 w-5" />
                            </div>
                        )}
                        {type === "fire" && (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                                <HiFire className="h-5 w-5" />
                            </div>
                        )}
                        <div className="ml-3 text-sm font-normal text-gray-900">{message}</div>
                    </Toast>
                </motion.div>
            )}
        </ToastContext.Provider>
    );
};
