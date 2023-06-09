'use client';

import { useCallback, useState } from 'react';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from 'react-hook-form';

import axios from "axios";

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

import Modal from './Modal';

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ... data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged In Successfully');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  const toggleModals = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col px-5'>
      <Heading
        title='Welcome back!' 
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-1 mt-1 text-black'>
      <div className='w-full'>
        <Button 
          small
          label='Proceed with Google'
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
      </div>
      <div className='text-zinc-400 mt-1'>
        <div>
          Don&apos;t have an account?
          <span
          onClick={toggleModals} 
          className='text-amber-300 hover:text-amber-100 ml-1
          transition duration-500 cursor-pointer'>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}

export default LoginModal;