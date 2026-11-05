import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppShell } from '@/components/shell'

export default async function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const sessionUser = {
    name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
    email: user.email ?? null,
    image: user.user_metadata?.avatar_url ?? null
  }

  return <AppShell user={sessionUser}>{children}</AppShell>
}
