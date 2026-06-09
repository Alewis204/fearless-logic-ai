import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter";

/**
 * Returns the NextAuth options.
 * The initialization is lazy to prevent build-time crashes when environment variables are missing.
 */
export const getAuthOptions = (): NextAuthOptions => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const options: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
      }),
      EmailProvider({
        server: process.env.EMAIL_SERVER || "",
        from: process.env.EMAIL_FROM || "",
      }),
    ],
    callbacks: {
      async session({ session, user }: any) {
        if (session?.user && user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    // Use JWT strategy if no adapter is present (e.g. during build)
    session: {
      strategy: (supabaseUrl && supabaseServiceRoleKey) ? "database" : "jwt",
    },
  };

  // Only use the Supabase adapter if credentials are provided
  if (supabaseUrl && supabaseServiceRoleKey) {
    options.adapter = SupabaseAdapter({
      url: supabaseUrl,
      secret: supabaseServiceRoleKey,
    });
  }

  return options;
};

// We don't export authOptions as a constant anymore because it triggers eager initialization.
// Callers should use getAuthOptions() instead.
