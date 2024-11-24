import React from 'react';
import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';

interface HeaderProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Header({ active, setActive }: HeaderProps) {
  const changeSideBar = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <header className="bg-gray-900 dark:bg-dark-950 text-white p-4 flex items-center justify-between">
      <button
        onClick={changeSideBar}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
      >
        {active ? (
          <>
             <ArrowLeftCircle size={20} />
          </>
        ) : (
          <>
            <ArrowRightCircle size={20} />
          </>
        )}
      </button>
    </header>
  );
}
