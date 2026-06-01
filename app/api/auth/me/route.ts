import { getSession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true },
  })
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

  return Response.json({ user })
}
