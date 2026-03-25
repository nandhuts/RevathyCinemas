import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

export const metadata = {
  title: 'Admin Dashboard | Revathy Cinemax',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      {children}
    </AdminAuthGuard>
  );
}
