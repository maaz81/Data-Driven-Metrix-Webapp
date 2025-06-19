import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AddCampaignForm = () => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    impressions: '',
    clicks: '',
    conversions: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      await axios.post('http://localhost:5000/api/campaigns', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Campaign added!');
      navigate('/dashboard');
    } catch (err) {
      alert('Error adding campaign');
    }
  };

  const cancel = () => {
    navigate('/dashboard');
  };

  const logout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add New Campaign</h2>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
            title="Logout"
          >
            Logout
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Campaign Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="impressions"
            placeholder="Impressions"
            value={form.impressions}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="clicks"
            placeholder="Clicks"
            value={form.clicks}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="conversions"
            placeholder="Conversions"
            value={form.conversions}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={cancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampaignForm;
