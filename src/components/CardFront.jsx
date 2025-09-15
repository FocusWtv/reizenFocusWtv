import React from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const CardFront = ({ image, title, text, status }) => {
    // Define status styling based on status type
    const getStatusStyle = (status) => {
      switch (status) {
        case 'volzet':
          return {
            bg: 'bg-red-500',
            text: 'text-white',
            label: 'Volzet'
          };
        case 'beperkt':
          return {
            bg: 'bg-orange-500',
            text: 'text-white',
            label: 'Beperkt aantal plaatsen'
          };
        case 'Beschikbaar':
          return {
            bg: 'bg-green-500',
            text: 'text-white',
            label: 'Beschikbaar'
          };
        default:
          return {
            bg: 'bg-green-500',
            text: 'text-white',
            label: 'Beschikbaar'
          };
      }
    };
  
    const statusStyle = getStatusStyle(status);
  return (
    <div className="relative h-full w-full rounded-lg border-4 border-[#162b58] shadow-2xl overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-cover" />
            {/* Status Label */}
            {status && (
        <div className={`absolute top-3 right-3 ${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10`}>
          {statusStyle.label}
        </div>
      )}


      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="font-semibold">{text}</p>
        <div className="mt-2 flex justify-center">
          <ArrowRightIcon className="h-6 w-6 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CardFront;