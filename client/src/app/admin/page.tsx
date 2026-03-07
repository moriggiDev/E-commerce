import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminView from '@/components/modules/admin/AdminView';

export const metadata = {
  title: 'Painel Administrativo | NXS HUB',
};

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== 'admin') {
      redirect('/login');
    }
  } catch {
    redirect('/login');
  }

  return <AdminView />;
}