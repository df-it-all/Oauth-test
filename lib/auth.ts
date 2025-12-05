import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

// Demo users for development (in production, use a database)
const users = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    // Password: password123 (hashed with bcryptjs)
    password: "$2b$10$ALxlYsSfvOdagwNgzbShCu1SD01bAPHIWpYBuDaTNdYeWsJv7Myz.",
  },
  {
    id: "2",
    email: "user@example.com", 
    name: "Regular User",
    // Password: user123 (hashed with bcryptjs)
    password: "$2b$10$9vdNka4a89/WzBO4yZMiuu6YVgowXnT/Y4Ix.J2epsf8f0ptWAdFS",
  },
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Microsoft Entra ID (Azure AD) Provider
    MicrosoftEntraID({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      // Use issuer with tenant ID for organization-specific login
      // For multi-tenant, use: "https://login.microsoftonline.com/common/v2.0"
      issuer: process.env.AZURE_AD_TENANT_ID 
        ? `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0`
        : undefined,
    }),
    // Credentials Provider for username/password login
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Find user (in production, query from database)
        const user = users.find((u) => u.email === email)

        if (!user) {
          return null
        }

        // Verify password
        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
})
