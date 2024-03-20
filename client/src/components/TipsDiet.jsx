import React from 'react';

const healthyTipsData = [
    {
        id: '1',
        title: '10 Tips Diet untuk Menurunkan Berat Badan yang Aman & Sehat',
        link: 'https://www.siloamhospitals.com/informasi-siloam/artikel/diet-untuk-menurunkan-berat-badan'
    },
    {
        id: '2',
        title: 'Tips dan Menu Diet Sehat 30 Hari untuk Turunkan Berat Badan',
        link: 'https://www.halodoc.com/artikel/tips-dan-menu-diet-sehat-30-hari-untuk-turunkan-berat-badan'
    },
    {
        id: '3',
        title: '5 Manfaat Olahraga Bagi Tubuh',
        link: 'https://ayosehat.kemkes.go.id/5-manfaat-olahraga-bagi-tubuh'
    },
    // Tambahkan data tips diet lainnya di sini
];

export default function TipsDiet() {
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Tips Diet Sehat</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <ul className="divide-y divide-gray-200">
                    {healthyTipsData.map((tip) => (
                        <li key={tip.id} className="py-4">
                            <a href={tip.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{tip.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
