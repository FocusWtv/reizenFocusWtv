import { useState } from 'react';

export default function CollapsibleSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-4 border-[#a1c8ff] rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#002855] to-[#0047AB] text-white rounded-full hover:scale-105 transition-transform shadow-lg"
  aria-label={isOpen ? "Collapse section" : "Expand section"}
>
  <span className="text-sm font-medium">{isOpen ? '▲ Inklappen' : '▼ Uitklappen'}</span>
</button>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
}