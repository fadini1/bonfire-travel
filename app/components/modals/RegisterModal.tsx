'use client';

import { useCallback, useState } from 'react';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from 'react-hook-form';

import axios from "axios";

import useRegisterModal from '@/app/hooks/useRegisterModal';

import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data).then(() => {
      toast.success('Account Created');
      registerModal.onClose();
      loginModal.onOpen();
    }).catch((error) => {
      toast.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const toggleModals = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);


  const bodyContent = (
    <div className='flex flex-col px-5'>
      <Heading
        title='Welcome to the Bonfire, Traveler!' 
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
        id='name'
        label='Name'
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
    <div className='flex flex-col gap-2 mt-1 text-black'>
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
          Already have an account?
          <span
          onClick={toggleModals} 
          className='text-amber-300 hover:text-amber-100 ml-1
          transition duration-500 cursor-pointer'>
            Login
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Sign Up'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}

export default RegisterModal;