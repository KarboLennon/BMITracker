import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function getStatus(bmi) {
  if (bmi < 18.5) {
    return 'Kurus';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Gendut';
  } else {
    return 'Obesitas !!!';
  }
}

export default function UpdateData() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    berat: '',
    tinggi: '',
    umur: '',
    status: '',
    BMI: '',
  });

  useEffect(() => {
    fetchBMI();
  }, []);

  const fetchBMI = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/bmi/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch BMI data from the server.');
      }
      const data = await response.json();
      // Mengisi form dengan data yang diterima dari server
      setFormData({
        ...data,
        // Menghitung status berat badan berdasarkan BMI yang diterima
        status: getStatus(data.bmi)
      });
    } catch (error) {
      console.error('Error fetching BMI data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cek apakah nilai yang diterima dapat dikonversi menjadi float64
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      // Jika tidak dapat dikonversi, kosongkan nilai
      setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
      return;
    }
    // Jika dapat dikonversi, lakukan operasi perhitungan dan perbarui status dan BMI
    const bmi = name === 'berat' ? numericValue / (formData.tinggi / 100) ** 2 : formData.berat / (numericValue / 100) ** 2;
    const roundedBMI = parseFloat(bmi.toFixed(1)); // Batasi ke satu angka desimal
    const newStatus = getStatus(roundedBMI);
    setFormData(prevData => ({
      ...prevData,
      [name]: numericValue,
      BMI: roundedBMI,
      status: newStatus
    }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Konfirmasi sebelum mengirim data
      const confirmation = window.confirm('Apakah Anda yakin untuk mengubah data?');
      if (!confirmation) {
        return; // Jika pengguna membatalkan, keluar dari fungsi handleSubmit
      }
  
      const { created_at, ...updatedData } = formData; // Menghapus properti created_at
      const response = await fetch(`http://localhost:4000/api/bmi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        throw new Error('Failed to update BMI data.');
      }
      // Update BMI in the database
      const updatedBMIResponse = await fetch(`http://localhost:4000/api/bmi/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!updatedBMIResponse.ok) {
        throw new Error('Failed to fetch updated BMI data from the server.');
      }
      const updatedBMIData = await updatedBMIResponse.json();
      // Update state with the updated BMI from the database
      setFormData(prevData => ({
        ...prevData,
        BMI: updatedBMIData.BMI
      }));
      navigate('/data'); 
    } catch (error) {
      console.error('Error updating BMI data:', error);
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Update Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama:
            <input type="text" name="nama" value={formData.nama} onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Berat:
            <input type="number" name="berat" value={formData.berat} onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tinggi:
            <input type="number" name="tinggi" value={formData.tinggi} onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Umur:
            <input type="number" name="umur" value={formData.umur} onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
        </div>
      </form>
    </div>
  );
}
