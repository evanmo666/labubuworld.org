import { Metadata } from 'next'
import { DashboardContent } from '@/components/admin/DashboardContent'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Labubu World',
  description: 'Manage Labubu series, figures, and news content',
  robots: 'noindex, nofollow'
}

export default function AdminDashboard() {
  return <DashboardContent />
} 