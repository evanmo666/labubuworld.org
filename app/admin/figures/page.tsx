import { Metadata } from 'next'
import { FiguresManagement } from '@/components/admin/FiguresManagement'

export const metadata: Metadata = {
  title: 'Manage Figures - Admin Dashboard',
  description: 'Manage Labubu figures collection',
  robots: 'noindex, nofollow'
}

export default function ManageFiguresPage() {
  return <FiguresManagement />
} 