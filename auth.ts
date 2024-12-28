import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
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
  }
})
