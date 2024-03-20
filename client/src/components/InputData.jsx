import React, { useState } from 'react';

export default function InputData() {
  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [umur, setUmur] = useState('');
  const [kelamin, setKelamin] = useState('Laki-Laki');
  const [nama, setNama] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [data, setData] = useState([]);


  const calculateBMI = () => {
  if (nama !== '' && berat !== '' && tinggi !== '' && umur !== '' && kelamin !== '' && !isNaN(parseFloat(berat)) && !isNaN(parseFloat(tinggi)) && !isNaN(parseFloat(umur)) && parseFloat(tinggi) > 0) {
    const calculatedBMI = (parseFloat(berat) / ((parseFloat(tinggi) / 100) ** 2)).toFixed(1);
    const confirmation = window.confirm('Apakah datanya sudah benar?');
    if (confirmation) {
      sendBMI(calculatedBMI);
      setStatusMessage('Calculating BMI...');
    }
  } else {
    setStatusMessage('Semua data wajib diisi.');
  }
}


  const sendBMI = async (bmiValue) => {
    try {
      const response = await fetch('http://localhost:4000/api/bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          berat: parseFloat(berat),
          tinggi: parseFloat(tinggi),
          umur: parseInt(umur),
          kelamin: kelamin,
          nama: nama,
          bmi: parseFloat(bmiValue),
          status: getStatus(parseFloat(bmiValue))
        })
      });
      if (!response.ok) {
        throw new Error('Failed to send BMI data to the server.');
      }
      setStatusMessage('Data berhasil disimpan!');
      setBerat('');
      setTinggi('');
      setUmur('');
      setKelamin('Laki-Laki');
      setNama('');
      setData([...data, { nama, berat, tinggi, umur, bmi: bmiValue }]);
      
    } catch (error) {
      setStatusMessage('Failed to submit BMI data: ' + error.message);
      console.error('Error while sending BMI data:', error);
    }
  }

  return (
    <div className="flex gap-4">
    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
      <BoxWrapper>
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col items-center lg:items-start">
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="input-field mb-4"
        />
        <input
          type="number"
          placeholder="Berat Badan (kg)"
          value={berat}
          onChange={(e) => setBerat(e.target.value)}
          className="input-field mb-4"
        />
        <input
          type="number"
          placeholder="Tinggi Badan (cm)"
          value={tinggi}
          onChange={(e) => setTinggi(e.target.value)}
          className="input-field mb-4"
        />
        <input
          type="number"
          placeholder="Umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          className="input-field mb-4"
        />
        <div className="relative mb-4">
          <label>Jenis Kelamin:</label>
          <select value={kelamin} onChange={(e) => setKelamin(e.target.value)} className="input-field">
            <option value="Laki-Laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M2 10c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8zm2 0a6 6 0 1110.396 4.51 1 1 0 11-1.742-.965A4 4 0 104 10z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <button onClick={calculateBMI} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
          Hitung BMI
        </button>
        {statusMessage && <div className="mt-2 text-red-500">{statusMessage}</div>}
      </div>
      </BoxWrapper>
      <BoxWrapper>
      <table className="w-full table-auto">
  <thead>
    <tr>
      <th className="px-4 py-2">Nama</th>
      <th className="px-4 py-2">Berat (kg)</th>
      <th className="px-4 py-2">Tinggi (cm)</th>
      <th className="px-4 py-2">Umur</th>
      <th className="px-4 py-2">BMI</th>
      <th className="px-4 py-2">Status</th>
    </tr>
  </thead>
  <tbody>
  {data.map((item, index) => (
    <tr key={index}>
      <td className="border px-4 py-2">{item.nama}</td>
      <td className="border px-4 py-2">{item.berat}</td>
      <td className="border px-4 py-2">{item.tinggi}</td>
      <td className="border px-4 py-2">{item.umur}</td>
      <td className="border px-4 py-2">{item.bmi !== null ? item.bmi : '-'}</td>
      {/* Gunakan getStatus(item.bmi) untuk mendapatkan status */}
      <td className="border px-4 py-2">{item.bmi !== null ? getStatus(item.bmi) : '-'}</td>
    </tr>
  ))}
</tbody>

</table>

      </BoxWrapper >
      </div>
    </div>
  )
}

function BoxWrapper({ children }) {
  return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

function getStatus(bmi) {
  if (bmi < 18.5) {
    return 'Kurus';
  } else if (bmi >= 18.5 && bmi < 25) { 
    return 'Ideal';
  } else if (bmi >= 25 && bmi < 30) { 
    return 'Gendut';
  } else {
    return 'Obesitas !!!';
  }
}

