import { useState, useEffect } from 'react';

const AdminHomepage = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Focus & WTV: Onze Reizen',
    subtitle: 'Klik op een kaart om meer te weten te komen over de reis van uw keuze!'
  });
  
  // Nieuwe state voor backend communicatie
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTravelCards: 0,
    totalInfoEvents: 0,
    totalVideos: 0
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  // Laad homepage content en stats bij component mount
  useEffect(() => {
    fetchHomepageData();
    fetchStats();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-content`);
      if (response.ok) {
        const data = await response.json();
        setHeroContent(data.heroContent || heroContent);
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      setError('Kon homepage data niet laden');
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/dashboard-stats`);
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalTravelCards: data.totalTravelCards || 0,
          totalInfoEvents: data.totalInfoEvents || 0,
          totalVideos: data.totalVideos || 0
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Kon statistieken niet laden');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_BASE_URL}/homepage-content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heroContent }),
      });

      if (response.ok) {
        alert('Homepage content succesvol opgeslagen!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      console.error('Error saving homepage content:', err);
      alert('Fout bij opslaan van homepage content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Homepage data wordt geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Homepagina</h1>
        {/* Quick stats */}
        <div className="flex gap-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {stats.totalTravelCards} Reizen
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {stats.totalInfoEvents} Infoavonden
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <span>{error}</span>
            <button 
              onClick={() => {
                setError(null);
                fetchHomepageData();
                fetchStats();
              }}
              className="ml-4 text-red-800 underline hover:no-underline"
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Hero Sectie</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hoofdtitel
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
                Subtitel
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Reiskaarten sectie</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {stats.totalTravelCards} actieve kaarten
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Beheer de kaarten voor de reizen hier
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Beheer 
          </button>
        </div>

        {/* Infoavonden events Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Infoavonden sectie</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {stats.totalInfoEvents} events
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Beheer de infoavond kaarten op de homepage
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Beheer
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              saving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Opslaan...
              </div>
            ) : (
              'Opslaan'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;