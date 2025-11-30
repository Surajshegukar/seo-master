
import { Outfit } from 'next/font/google';
// import '@/src/app/admin/globals.css';

import { SidebarProvider } from '@/src/context/admin/SidebarContext';
import { ThemeProvider } from '@/src/context/admin/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { requireAdmin } from '@/src/lib/auth';
 
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();
  return (
<>
        <ThemeProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <SidebarProvider>                                         
          {children}
          </SidebarProvider>
        </ThemeProvider>


    </>
  );
}
