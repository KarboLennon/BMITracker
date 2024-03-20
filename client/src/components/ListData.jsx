import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListData() {
  const [bmiData, setBmiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBMI();
  }, []);

  const fetchBMI = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/bmi');
      if (!response.ok) {
        throw new Error('Failed to fetch BMI data from the server.');
      }
      const data = await response.json();
      setBmiData(data);
    } catch (error) {
      console.error('Error fetching BMI data:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('yakin mau ngehapus data??');
    if (!confirmed) return; // Jika pengguna membatalkan, berhenti di sini

    try {
      const response = await fetch(`http://localhost:4000/api/bmi/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete BMI data.');
      }
      // Hapus item yang dihapus dari state
      setBmiData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting BMI data:', error);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the update page with the ID parameter
    navigate(`/data/${id}`);
  };

  return (
    <div className="w-full">
  <h1 className="text-xl font-bold mb-4">List Data</h1>
  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Nama</th>
          <th className="px-4 py-2">Berat</th>
          <th className="px-4 py-2">Tinggi</th>
          <th className="px-4 py-2">Umur</th>
          <th className="px-4 py-2">BMI</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {bmiData.map(item => (
          <tr key={item.id} className="text-center">
            <td className="border px-4 py-2">{item.nama}</td>
            <td className="border px-4 py-2">{item.berat}</td>
            <td className="border px-4 py-2">{item.tinggi}</td>
            <td className="border px-4 py-2">{item.umur}</td>
            <td className="border px-4 py-2">{item.bmi}</td>
            <td className="border px-4 py-2">{item.status}</td>
            <td className="border px-4 py-2">
              <button onClick={() => handleUpdate(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md mr-2 transition duration-300 ease-in-out">Update</button>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
