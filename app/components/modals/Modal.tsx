'use client';

import { useState, useEffect, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';

import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className='flex justify-center items-center overflow-hidden
      fixed inset-0 z-50 outline-none focus:outline-none
      bg-black/70 text-black'>
        <div className='relative w-full md:w-2/3 lg:w-2/4 xl:w-2/5 my-6 
        mx-auto h-full md:h-auto overflow-hidden'>
          <div className={`translate duration-300 h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className='translate h-full md:h-auto border-0 md:rounded-lg
            shadow-lg relative flex flex-col w-full bg-[#212121] outline-none
            focus:outline-none p-1'>

              {/* HEADER */}
              <div className='flex items-center pl-10 pt-5 pb-1 rounded-t-lg'>
                <button
                onClick={handleClose} 
                className='mr-2 p-1 transition bg-zinc-100
                duration-500 rounded-full text-zinc-900
                hover:bg-amber-300 hover:text-black'>
                  <IoMdClose
                    className='h-[10px] w-[10px] '
                  />
                </button>
                <div className='text-lg font-semibold rounded-lg text-black 
                bg-amber-300 hover:bg-amber-200 transition duration-300
                py-[3px] px-4'>
                  {title}
                </div>
              </div>

              {/* BODY */}
              <div className='relative p-2 flex-auto'>
                {body}
              </div>

              {/* FOOTER */}
              <div className='flex flex-col gap-2 p-2 ml-7 mb-2'>
                <div className='flex items-center gap-2 w-full'>
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    small
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;