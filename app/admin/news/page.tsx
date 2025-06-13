import { Metadata } from 'next'
import { NewsManagement } from '@/components/admin/NewsManagement'

export const metadata: Metadata = {
  title: 'Manage News - Admin Dashboard',
  description: 'Manage Labubu news articles',
  robots: 'noindex, nofollow'
}

export default function ManageNewsPage() {
  return <NewsManagement />
} 