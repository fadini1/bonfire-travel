'use client';

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { categories } from "../navbar/Categories";

import axios from "axios";
import dynamic from "next/dynamic";

import useRentModal from "@/app/hooks/useRentModal";

import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const goBack = () => {
    setStep((value) => value - 1);
  }

  const goNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return goNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data).then(() => {
      toast.success('Property Created Successfully');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();  
    }).catch(() => {
      toast.error('Something Went Wrong :D');
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-2 px-5">
      <Heading
        title="How's your property like? Select an appropiate category" 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 max-h-[50vh] 
      overflow-y-auto ml-2 scrollbar-thin scrollbar-thumb-amber-300
      gap-1 pr-1 hover:scrollbar-thumb-amber-200 transition duration-300
      cursor-pointer">
        {categories.map((item) => (
          <div
          key={item.label}
          className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label} 
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="px-5 flex flex-col gap-2">
        <Heading
          title="Where's your property? Select its location" 
        />
        <div className="ml-2">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)} 
          />
          <Map
            center={location?.latlng} 
          />
        </div>
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="px-5 flex flex-col gap-2">
        <Heading
          title="Give us some insight on your property" 
        />
        <div className="ml-2">
          <Counter
            title="Guests" 
            subtitle="How many guests can it accommodate?"
            value={guestCount}
            onChange={(value) => setCustomValue('guestCount', value)}
          />
          <Counter
            title="Rooms" 
            subtitle="How many rooms does it have?"
            value={roomCount}
            onChange={(value) => setCustomValue('roomCount', value)}
          />
          <Counter
            title="Bathrooms" 
            subtitle="How many bathrooms does it have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="px-5 flex flex-col gap-2">
        <Heading
          title="Grant your guests a glimpse of their soon-to-be home!" 
        />
        <ImageUpload
          value={imageSrc} 
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="px-5 flex flex-col gap-1">
        <Heading
          title="Capture your guests hearts! Give it your best!"   
        />
        <Input
          required
          id="title"
          label="Title"
          disabled={isLoading}
          register={register} 
          errors={errors}
        />
        <Input
          required
          id="description"
          label="Description"
          disabled={isLoading}
          register={register} 
          errors={errors}
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="px-5 flex flex-col gap-1">
        <Heading
          title="Set a price for a 1-day-stay" 
        />
        <Input
          required
          formatPrice 
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    )
  }

  return (
    <Modal 
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : goBack}
      title="Log Property" 
      body={bodyContent}
    />
  )
}

export default RentModal;