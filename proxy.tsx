import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );

                    response = NextResponse.next({ request });

                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (user && (pathname === "/" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return updateSession(request);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest|workbox-|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
