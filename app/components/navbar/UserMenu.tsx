'use client';

import { useState, useCallback } from 'react';
import { AiOutlineMenu, AiOutlinePlus} from 'react-icons/ai';
import { signOut } from 'next-auth/react';

import { SafeUser } from '@/app/types';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';

import Avatar from '../Avatar';

import UserMenuItem from './UserMenuItem';
import { useRouter } from 'next/navigation';
import { BsPlus } from 'react-icons/bs';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }

    if (currentUser) {
      rentModal.onOpen();
    }
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div
        onClick={onRent}
        className="text-sm hover:bg-amber-200 navbar-item
        cursor-pointer flex items-center gap-1">
          <div className='hidden md:block'>
            Log Property 
          </div>
          <div>
            <BsPlus color='black' size={20}/>
          </div>
        </div>
        <div
        onClick={toggleOpen}
        className="py-1 ml-2 flex items-center gap-2 rounded-full cursor-pointer">
          <AiOutlineMenu 
            className='h-5 w-5 hover:opacity-80 transition duration-300' 
          />
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[9.5rem]
        bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <UserMenuItem
                  onClick={() => router.push('/travels')}
                  label='Travels'
                />
                <UserMenuItem
                  onClick={() => router.push('/favorites')}
                  label='Favorites'
                />
                <UserMenuItem
                  onClick={() => router.push('/reservations')}
                  label='Reservations'
                />
                <UserMenuItem
                  onClick={() => router.push('/properties')}
                  label='Properties'
                />
                <UserMenuItem
                  onClick={rentModal.onOpen}
                  label='Log Property'
                />
                <UserMenuItem
                  onClick={() => signOut()}
                  label='Logout'
                />
              </>
            ) : (
              <>
                <UserMenuItem
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <UserMenuItem
                  onClick={registerModal.onOpen}
                  label='Sign Up'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;