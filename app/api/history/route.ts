import { getSession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const analyses = await prisma.analysis.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      sourceType: true,
      fileName: true,
      recommendation: true,
      createdAt: true,
    },
  })

  return Response.json({ analyses })
}
