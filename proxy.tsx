import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './lib/supabaseClient';

export async function proxy(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return await updateSession(request)
}

export const config = {
    matcher: [
        '/((?!api|login|register|_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest|workbox-|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}