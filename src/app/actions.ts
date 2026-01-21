'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createIssue(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const priority = formData.get('priority') as string
  const status = formData.get('status') as string

  if (!title) return

  await supabase.from('issues').insert({
    title,
    description,
    priority,
    status,
  })

  // This tells Next.js to refresh the data on the screen immediately
  revalidatePath('/')
}