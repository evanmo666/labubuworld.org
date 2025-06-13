import { Metadata } from 'next'
import { SeriesManagement } from '@/components/admin/SeriesManagement'

export const metadata: Metadata = {
  title: 'Manage Series - Admin Dashboard',
  description: 'Manage Labubu series collection',
  robots: 'noindex, nofollow'
}

export default function ManageSeriesPage() {
  return <SeriesManagement />
} 