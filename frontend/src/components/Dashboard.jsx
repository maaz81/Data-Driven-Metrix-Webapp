import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    date: '',
    impressions: '',
    clicks: '',
    conversions: '',
  });

  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('http://localhost:5000/api/campaigns', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data);
    } catch (err) {
      alert('Unauthorized or error fetching data');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const deleteCampaign = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirm) return;

    try {
      const token = Cookies.get('token');
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCampaigns(); // Refresh the list
    } catch (err) {
      alert('Error deleting campaign');
    }
  };

  const startEdit = (campaign) => {
    setEditId(campaign.id);
    setEditForm({
      name: campaign.name,
      date: campaign.date,
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      conversions: campaign.conversions,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`http://localhost:5000/api/campaigns/${editId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      fetchCampaigns();
    } catch (err) {
      alert('Error updating campaign');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Campaigns Dashboard</h2>
          <div className="space-x-2">
            <button
              onClick={() => navigate('/add')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Add Campaign
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Impressions</th>
                <th className="p-3">Clicks</th>
                <th className="p-3">Conversions</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
                  {editId === c.id ? (
                    <>
                      <td className="p-3">
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full border px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="date"
                          type="date"
                          value={editForm.date}
                          onChange={handleEditChange}
                          className="w-full border px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="impressions"
                          type="number"
                          value={editForm.impressions}
                          onChange={handleEditChange}
                          className="w-full border px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="clicks"
                          type="number"
                          value={editForm.clicks}
                          onChange={handleEditChange}
                          className="w-full border px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="conversions"
                          type="number"
                          value={editForm.conversions}
                          onChange={handleEditChange}
                          className="w-full border px-2 py-1"
                        />
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={submitEdit}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{c.name}</td>
                      <td className="p-3">{c.date}</td>
                      <td className="p-3">{c.impressions}</td>
                      <td className="p-3">{c.clicks}</td>
                      <td className="p-3">{c.conversions}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => startEdit(c)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCampaign(c.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
