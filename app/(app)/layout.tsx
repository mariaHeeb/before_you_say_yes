import { verifySession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'
import { Navbar } from '@/components/layout/Navbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession()
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { email: true },
  })
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar userEmail={user?.email} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </main>
    </div>
  )
}
