import { useState } from 'react';

const AdminHomepage = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Onze Reizen',
    subtitle: 'Klik op een kaart om meer te weten te komen over de reis!'
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Homepage content saved!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Homepage Management</h1>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={heroContent.title}
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <textarea
                value={heroContent.subtitle}
                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Travel Cards Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Travel Cards</h2>
          <p className="text-gray-600 mb-4">
            Manage the travel cards displayed on the homepage
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Manage Travel Cards
          </button>
        </div>

        {/* Info Events Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Info Events Section</h2>
          <p className="text-gray-600 mb-4">
            Manage the info events displayed on the homepage
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Manage Info Events
          </button>
        </div>

        {/* Videos Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Videos Section</h2>
          <p className="text-gray-600 mb-4">
            Manage the video gallery on the homepage
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Manage Videos
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;