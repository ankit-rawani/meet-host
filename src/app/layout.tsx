import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContextProvider } from "@/context/ToastContext";
import Script from "next/script";
import "./globals.css";

export const metadata = {
    title: "Meet Host",
    description: "A host for all your meets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ToastContextProvider>
                    <AuthContextProvider>{children}</AuthContextProvider>
                </ToastContextProvider>
                <Script async src="../../node_modules/flowbite/dist/flowbite.min.js" />
            </body>
        </html>
    );
}
