"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-linear-to-tr from-blue-950 to-blue-800 text-white">
            {children}
        </main>
    );
}