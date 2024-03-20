import React, { useState, useEffect } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';

export default function Grafik() {
  const [bmiData, setBmiData] = useState(null);

  useEffect(() => {
    fetchBMI();
  }, []);

  const fetchBMI = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/bmi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch BMI data from the server.');
      }
      const bmiData = await response.json();
      setBmiData(bmiData);
    } catch (error) {
      console.error('Error while fetching BMI data:', error);
    }
  }
  
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Grafik BMI</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        {bmiData && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={bmiData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nama" />
              <YAxis/>
              <Tooltip />
              <Area type="monotone" dataKey="bmi" stroke="#00ff00" fillOpacity={1} fill="url(#colorBmi)" />
              <Area type="monotone" dataKey="berat" stroke="#ff0000" fillOpacity={1} fill="url(#colorBerat)" />
              <Area type="monotone" dataKey="tinggi" stroke="	#0000FF" fillOpacity={1} fill="url(#colorTinggi)" />
              <defs>
                <linearGradient id="colorBmi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBerat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTinggi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="	#0000FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="	#0000FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
        {!bmiData && <p>Loading...</p>}
      </div>
    </div>
  );
}

