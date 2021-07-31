import 'express-session'

declare module 'express-session' {
  interface Session {
    userData: {
      id: number
      roles: string[]
      username: string
      firstName: string
      lastName: string
      email: string
      phone: string
    }
  }
}
