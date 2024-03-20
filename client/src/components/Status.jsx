import React, { useState, useEffect } from 'react';
import { IoBarChartSharp, IoTimeSharp, IoBody } from 'react-icons/io5';

export default function Status() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [averageBMI, setAverageBMI] = useState(null);
  const [bmiData, setBmiData] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/api/bmi')
      .then(response => response.json())
      .then(data => {
        // Ambil data BMI dari respons
        setBmiData(data);
      })
      .catch(error => {
        console.error('Error fetching BMI data:', error);
      });
  }, []);

  // Fungsi untuk menghitung rata-rata BMI dan menentukan status
  useEffect(() => {
    if (bmiData.length === 0) return;

    const totalBMI = bmiData.reduce((acc, item) => acc + item.bmi, 0);
    const average = totalBMI / bmiData.length;
    setAverageBMI(average.toFixed(1));

    if (average < 18.5) {
      setStatus('Kurus');
    } else if (average >= 18.5 && average < 25) {
      setStatus('Ideal');
    } else if (average >= 25 && average < 30) {
      setStatus('Gendut');
    } else {
      setStatus('Obesitas');
    }
  }, [bmiData]);

  return (
    <div className="flex gap-4">
      <BoxWrapper className="group hover:shadow-lg hover:border-transparent hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
    <IoBody className="text-2xl text-white" />
  </div>
  <div className="pl-4">
    <span className="text-sm text-gray-500 font-light">Rata-Rata Body Mass Index (BMI)</span>
    <div className="flex items-center">
      <strong className="text-xl text-gray-700 font-semibold">{averageBMI !== null ? averageBMI : 'Loading...'}</strong>
    </div>
  </div>
</BoxWrapper>
<BoxWrapper className="group hover:shadow-lg hover:border-transparent hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
    <IoBarChartSharp className="text-2xl text-white" />
  </div>
  <div className="pl-4">
    <span className="text-sm text-gray-500 font-light">Status</span>
    <div className="flex items-center">
      <strong className="text-xl text-gray-700 font-semibold">{status !== null ? status : 'Loading...'}</strong>
    </div>
  </div>
</BoxWrapper>
<BoxWrapper className="group hover:shadow-lg hover:border-transparent hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
    <IoTimeSharp className="text-2xl text-white" />
  </div>
  <div className="pl-4">
    <span className="text-sm text-gray-500 font-light">Waktu Saat Ini</span>
    <div className="flex items-center">
      <strong className="text-xl text-gray-700 font-semibold">{currentTime.toLocaleTimeString()}</strong>
    </div>
  </div>
</BoxWrapper>

    </div>
  );
}

function BoxWrapper({ children }) {
	return (
	  <div className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg p-6 flex-1 border border-gray-300 flex items-center hover:shadow-lg transition duration-300 text-white">
		{children}
	  </div>
	);
  }
  