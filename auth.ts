import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async signIn({ user, account, email, profile, credentials }) {
      // Aquí agrego mi lógica

      // Devuelvo true para que el usuario pueda iniciar sesión
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url === "/dashboard") return url
      return `${baseUrl}/dashboard`
    },
    async session({ session, user, token }) {
      // Agrego mi lógica
      return session
    },
    async jwt({ token, user, account }) {
      // Agrego mi lógica
      return token
    }
  },
})
