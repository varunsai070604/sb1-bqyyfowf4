import React, { useState } from 'react';
import { Globe, Shield } from 'lucide-react';

interface RiskAnalyzerProps {
  url: string;
  onAnalyze: (url: string) => void;
}

export const RiskAnalyzer: React.FC<RiskAnalyzerProps> = ({ url, onAnalyze }) => {
  const [inputUrl, setInputUrl] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(inputUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter website URL to analyze..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Shield className="h-5 w-5" />
          Analyze
        </button>
      </div>
    </form>
  );
};