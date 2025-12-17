"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/register", {
                email,
                password,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Register Berhasil",
                    text: "Silahkan login untuk melanjutkan",
                }).then(() => {
                    window.location.href = '/login'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Register Gagal",
                text: (error as Error).message,
            })
        }
    };

    return (
        <section className="w-full min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Register Page
                    </h1>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="c14220004@example.com"
                            className="w-full px-4 py-2 rounded-lg border text-black border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg border text-black border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 cursor-pointer w-full bg-slate-800 text-white py-2 rounded-lg font-semibold hover:bg-slate-900 transition"
                    >
                        Register
                    </button>
                </form>

                <div className="my-6 flex items-center gap-2">
                    <div className="flex-1 h-px bg-slate-300" />
                    <span className="text-xs text-slate-500">OR</span>
                    <div className="flex-1 h-px bg-slate-300" />
                </div>

                <p className="text-center text-sm text-slate-600">
                    <Link
                        href="/"
                        className="font-medium text-slate-800 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
}
