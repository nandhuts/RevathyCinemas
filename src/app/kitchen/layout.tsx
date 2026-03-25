import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

export const metadata = {
  title: 'Kitchen Display | Revathy Cinemax',
};

export default function KitchenLayout({
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
