import { Link } from "react-router-dom";

const CardBack = ({ text, link, status }) => {
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
      case 'open':
        return {
          bg: 'bg-green-500',
          text: 'text-white',
          label: 'Beschikbaar'
        };
      default:
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          label: 'Beschikbaar'
        };
    }
  };

  const statusStyle = getStatusStyle(status);

    const handleLinkClick = (e) => {
    e.preventDefault(); // Voorkom normale React Router navigatie
    e.stopPropagation();
    
    // Check if we're in an iframe
    if (window.parent !== window) {
      // We're in an iframe - navigate parent window to the detail page
      window.parent.location.href = `https://reizen.focus-wtv.be${link}`;
    } else {
      // We're not in an iframe - use normal React Router navigation
      window.location.href = link;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[image:linear-gradient(180deg,#162b58,#4ab0e1)] rounded-lg p-4">
      {/* Status Label */}
      {status && (
        <div className={`absolute top-3 right-3 ${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10`}>
          {statusStyle.label}
        </div>
      )}

      <p className="text-center text-xl text-white font-bold">{text}</p>
      <Link to={link} onClick={handleLinkClick} className="mt-8 border border-white bg-white text-[#162b58] font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
        Klik hier voor meer info
      </Link>
    </div>
  );
};

export default CardBack;
