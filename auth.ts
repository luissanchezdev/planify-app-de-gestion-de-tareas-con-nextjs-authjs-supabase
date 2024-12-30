import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import jwt from "jsonwebtoken"

console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async signIn({ user, account, email, profile, credentials }) {
      // Aquí agrego mi lógica

      // Devuelvo true para que el usuario pueda iniciar sesión
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url === "/spaces") return url
      return `${baseUrl}/spaces`
    },
    async session({ session, user }) {
      /* const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
          const payload = {
              aud: "authenticated",
              exp: Math.floor(new Date(session.expires).getTime() / 1000),
              sub: user.id,
              email: user.email,
              role: "authenticated", // Puedes definir roles basados en tu lógica de negocio
          }
          session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      } */
      return session
    },
    async jwt({ token, account, user }) {
        if (account) {
            token.accessToken = account.access_token
        }
        if (user) {
            token.sub = user.id
        }
        return token
    },
  },
})
