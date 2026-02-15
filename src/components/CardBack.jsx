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

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Link
      to={link}
      onClick={handleClick}
      className="relative flex h-full w-full flex-col items-center justify-center bg-[image:linear-gradient(180deg,#162b58,#4ab0e1)] rounded-lg p-4 cursor-pointer no-underline"
    >
      {/* Status Label */}
      {status && (
        <div className={`absolute top-3 right-3 ${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10`}>
          {statusStyle.label}
        </div>
      )}

      <p className="text-center text-xl text-white font-bold">{text}</p>
      <span className="mt-8 border border-white bg-white text-[#162b58] font-bold py-2 px-4 rounded hover:bg-gray-200 transition inline-block">
        Klik hier voor meer info
      </span>
    </Link>
  );
};

export default CardBack;
