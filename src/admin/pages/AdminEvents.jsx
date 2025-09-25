import { useState } from 'react';

const AdminEvents = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Reis naar Zuid-Afrika',
      date: 'dinsdag 23 september',
      image: 'afrika.jpg',
      link: 'https://focus-wtv.be/reizen/afrikareis-infoavond'
    },
    {
      id: 2,
      title: 'Cruise op de Mekong',
      date: 'woensdag 8 oktober',
      image: 'Mekong.jpeg',
      link: 'https://focus-wtv.be/reizen/mekongcruise-infoavond'
    },
    {
      id: 3,
      title: 'Adriatische cruise',
      date: 'maandag 20 oktober',
      image: 'foto16.jpeg',
      link: 'https://focus-wtv.be/reizen/adriatische-cruise-infoavond'
    },
    {
      id: 4,
      title: 'Reis Zuid-Finland',
      date: 'woensdag 3 december',
      image: 'Finland.jpg',
      link: 'https://focus-wtv.be/reizen/finland-2026-infoavond'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image: {event.image}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-3">{event.date}</p>
              <div className="flex justify-between items-center">
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Link
                </a>
                <div className="space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., dinsdag 23 september"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;