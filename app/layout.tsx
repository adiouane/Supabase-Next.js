import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { createSupabaseForServerComponent } from '@/lib/supabase.server'
import NavBar from '@/components/navBar'
import Footer from '@/components/footer'
import Dashboard from './admin/(internal)/dashboard/page'
import Login from './(app)/(public)/login/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = createSupabaseForServerComponent();

	const {
		data: { user },
	} = await supabase.auth.getUser();
  console.log(user);

  

  return (
    <html lang="en">
     
      <body className={inter.className}>
      {user && 
      <>
          <NavBar />
          {children}
          <Footer />
          </>
            }
        
        </body>
        {!user &&
          // redirect to login page
          <div>
            <Login />
          </div>
        }
    </html>
  )
}
