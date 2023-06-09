'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  bigTitle?: boolean;
  center?: boolean;
  bg?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  bigTitle,
  center,
  bg
}) => {
  return (
    <div className={`flex flex-col ml-2  
    ${center ? 'text-center' : 'text-start'}
    ${bg ? 'bg-zinc-900' : ''}
    ${bg ? 'rounded-lg' : ''}
    ${bg ? 'p-6' : ''}
    ${bg ? 'hover:bg-zinc-800/70 transition duration-300' : ''}`}>
      <div className={`
      ${bigTitle ? 'text-2xl' : ''}
      ${bigTitle ? 'text-zinc-300' : 'text-zinc-400'}`}>
        {title}
      </div>
      <div className="text-zinc-400 font-medium">
        {subtitle}
      </div>
    </div>
  )
}

export default Heading;