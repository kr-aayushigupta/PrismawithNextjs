
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
      },
    })

    // MongoDB ObjectIds to strings
    const safeUsers = users.map(user => ({
      ...user,
      id: user.id.toString(),
      accounts: user.accounts.map(acc => ({ ...acc, id: acc.id.toString(), userId: acc.userId.toString() })),
      sessions: user.sessions.map(sess => ({ ...sess, id: sess.id.toString(), userId: sess.userId.toString() })),
    }))

    return NextResponse.json(safeUsers)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 })
  }
}

