import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, orderBy, query, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminReizen = () => {
  const [reizen, setReizen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');
  const navigate = useNavigate();

  const loadTrips = async () => {
    try {
      const q = query(collection(db, 'trips'), orderBy('createdAt'));
      const snap = await getDocs(q);
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setReizen(items);
    } catch (_) {
      setReizen([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const togglePublish = async (trip) => {
    try {
      setUpdatingId(trip.id);
      // Optimistische update
      setReizen(prev => prev.map(r => r.id === trip.id ? { ...r, published: !r.published } : r));
      await updateDoc(doc(db, 'trips', trip.id), { published: !trip.published });
    } catch (_) {
      // bij fout, herladen
      loadTrips();
    } finally {
      setUpdatingId('');
    }
  };

  const removeTrip = async (trip) => {
    const ok = confirm(`Reis "${trip.title || trip.id}" verwijderen?`);
    if (!ok) return;
    try {
      setUpdatingId(trip.id);
      await deleteDoc(doc(db, 'trips', trip.id));
      setReizen(prev => prev.filter(r => r.id !== trip.id));
    } catch (_) {
      // fallback herladen
      loadTrips();
    } finally {
      setUpdatingId('');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reizen Management</h1>
        {/* Quick stats */}
        <div className="flex gap-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {reizen.length} Reizen
          </span>
        </div>
        <button onClick={() => navigate('/admin/reizen/new')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
          Nieuwe Reis
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reis Naam
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-gray-500">Laden…</td>
              </tr>
            ) : reizen.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-gray-500">
                  Nog geen reizen. Klik op <span className="font-semibold">Nieuwe Reis</span> om te starten.
                </td>
              </tr>
            ) : (
              reizen.map((reis) => (
                <tr key={reis.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reis.title || reis.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reis.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {reis.published ? 'Gepubliceerd' : 'Concept'}{reis.status ? ` · ${reis.status}` : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                    <button onClick={() => navigate(`/admin/reizen/${reis.slug || reis.id}`)} className="text-blue-600 hover:text-blue-900" disabled={updatingId===reis.id}>
                      Edit
                    </button>
                    <button onClick={() => togglePublish(reis)} className="text-yellow-700 hover:text-yellow-900" disabled={updatingId===reis.id}>
                      {reis.published ? 'Zet op concept' : 'Publiceer'}
                    </button>
                    <button onClick={() => removeTrip(reis)} className="text-red-600 hover:text-red-900" disabled={updatingId===reis.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReizen;