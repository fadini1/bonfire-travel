'use client';

interface UserMenuItemProps {
  onClick: () => void;
  label: string;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({ onClick, label }) => {
  return (
    <div
    onClick={onClick} 
    className="px-4 py-1.5 text-black font-semibold bg-zinc-300 
    hover:bg-zinc-100 transition duration-500">
      {label}
    </div>
  );
}

export default UserMenuItem;