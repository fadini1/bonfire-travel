'use client';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[80rem] mx-auto px-6 xl:px-24 md:px-14 sm:px-10">
      {children}
    </div>
  )
}

export default Container;