import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Globe,
  MailIcon,
} from "lucide-react";
import logo from "../assets/egypte/rivagesDuMonde.webp";

const BusinessInfoCard = ({ 
  name = "Rivages Du Monde",
  type = "Reisbureau in Brussel", 
  address = "Bergstraat 17, 1000 Brussel",
  phone = "02 899 84 00",
  hours = "Geopend · Sluit om 17:30",
  images = [logo],
  website = "https://www.rivagesdumonde.be/nl/",
  email = "info@rivagesdumonde.be",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`max-w-md mx-auto bg-[#162b58] text-white rounded-lg overflow-hidden shadow-xl ${className}`}>
      {/* Header Images */}
      <div className="relative h-48 bg-gray-800">
        <div className="flex h-full">
          {/* Main image */}
          <div className="flex-1 relative">
            <img
              src={images[0]}
              alt={`${name} main`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="p-4">
        <h1 className="text-2xl font-normal mb-2">{name}</h1>

        <p className="text-gray-200 mb-4">{type}</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1 mb-4">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col text-white items-center gap-1 p-2 bg-black rounded-lg border border-transparent hover:border-[#4ab0e1] transition-colors"
            aria-label="Website"
          >
            <Globe className="w-5 h-5" />
            <span className="text-md">Website</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex flex-col text-white items-center gap-1 p-2 bg-black rounded-lg border border-transparent hover:border-[#4ab0e1] transition-colors"
            aria-label="Mailen"
          >
            <MailIcon className="w-5 h-5" />
            <span className="text-md">Mailen</span>
          </a>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Adres: </span>
              <span className="text-blue-100 cursor-pointer">
                {address}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <span className="font-medium">Telefoon: </span>
              <span className="text-blue-100 cursor-pointer">
                {phone}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <span className="font-medium">Openingstijden: </span>
              <span className="text-green-400">{hours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoCard;
