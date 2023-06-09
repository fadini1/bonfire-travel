'use client';

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = `Seems like there's nothing here...`,
  subtitle = 'Try removing or changing some filters!',
  showReset
}) => {
  const router = useRouter();

  return (
    <div className="h-[80vh] flex flex-col gap-1 justify-center items-center">
      <Heading 
        bg
        bigTitle
        center
        title={title}
        subtitle={subtitle}
      />
      <div>
        {showReset && (
          <Button
            textButton
            label="Remove All Filters" 
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState;