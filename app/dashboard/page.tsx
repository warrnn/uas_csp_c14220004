"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type User = {
    email: string
}

type Announcement = {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/session');
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('/api/announcements');
                console.log(response.data);
                setAnnouncements(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
        fetchAnnouncements();
    }, []);

    if (loading) {
        return (
            <section className="w-full h-screen flex flex-col gap-4 p-8">
                <div className="flex justify-between gap-2">
                    <div className="flex-col gap-2">
                        <h1 className="text-3xl font-bold">Aplikasi Portal Karyawan</h1>
                        <p className="text-amber-300 font-semibold">Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full h-screen flex flex-col gap-4 p-8">
            <div className="flex justify-between gap-2">
                <div className="flex-col gap-2">
                    <h1 className="text-3xl font-bold">Aplikasi Portal Karyawan</h1>
                    <p className="text-amber-300 font-semibold">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="bg-red-500 h-fit py-2 px-4 rounded-lg hover:bg-red-600 transition-all cursor-pointer">Logout</button>
            </div>
            <div className="flex flex-col gap-2">
                {
                    announcements.map((announcement) => (
                        <div key={announcement.id} className="flex flex-col gap-2 bg-white text-black p-4 rounded-lg">
                            <p className="text-lg font-semibold">{announcement.title}</p>
                            <p>{announcement.content}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}