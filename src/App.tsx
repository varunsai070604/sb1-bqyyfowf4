import React from 'react';
import { Car } from 'lucide-react';
import DrowsinessDetector from './components/DrowsinessDetector';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Drowsiness Detection System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Driver Monitoring System
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time drowsiness detection with automated safety responses
          </p>
        </div>

        <DrowsinessDetector />
      </main>
    </div>
  );
}

export default App;