import { NextRequest } from 'next/server'
import { getSession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const analysis = await prisma.analysis.findUnique({ where: { id }, include: { flags: true } })

  if (!analysis) return Response.json({ error: 'Not found' }, { status: 404 })
  if (analysis.userId !== session.userId) return Response.json({ error: 'Forbidden' }, { status: 403 })

  return Response.json({ analysis })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const analysis = await prisma.analysis.findUnique({ where: { id } })

  if (!analysis) return Response.json({ error: 'Not found' }, { status: 404 })
  if (analysis.userId !== session.userId) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const updated = await prisma.analysis.update({
    where: { id },
    data: {
      ...(body.userAccepted !== undefined && { userAccepted: body.userAccepted }),
      ...(body.employerReachedOut !== undefined && { employerReachedOut: body.employerReachedOut }),
    },
  })

  return Response.json({ analysis: updated })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const analysis = await prisma.analysis.findUnique({ where: { id } })

  if (!analysis) return Response.json({ error: 'Not found' }, { status: 404 })
  if (analysis.userId !== session.userId) return Response.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.analysis.delete({ where: { id } })
  return new Response(null, { status: 204 })
}
