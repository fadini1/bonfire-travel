import { Nunito } from 'next/font/google';

import './globals.css';

import Navbar from './components/navbar/Navbar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

import ToasterProvider from './providers/ToasterProvider';

import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Bonfire',
  description: 'Best Booking Website',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head />
      <body className={font.className}>
        <div>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
          <div className='h-auto'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
