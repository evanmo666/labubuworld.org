import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// 管理员账户配置（生产环境应该使用数据库）
const ADMIN_EMAIL = 'admin@labubuworld.org'
const ADMIN_PASSWORD = 'labubu2024admin'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // 验证管理员凭据
        if (
          credentials?.email === ADMIN_EMAIL &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return {
            id: '1',
            email: ADMIN_EMAIL,
            name: 'Admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  },
  secret: process.env.NEXTAUTH_SECRET || 'labubu-world-secret-key-for-development'
}) 