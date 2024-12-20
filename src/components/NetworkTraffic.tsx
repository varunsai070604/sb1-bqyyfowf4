import React from 'react';
import { Activity, ArrowDown, ArrowUp } from 'lucide-react';
import { getMockNetworkStats } from '../utils/mockNetworkData';

export const NetworkTraffic: React.FC = () => {
  const stats = getMockNetworkStats();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Network Traffic</h3>
        <Activity className="h-6 w-6 text-blue-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDown className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Inbound</span>
          </div>
          <p className="text-lg font-semibold">{stats.inbound} KB/s</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">Outbound</span>
          </div>
          <p className="text-lg font-semibold">{stats.outbound} KB/s</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">Connections</span>
          </div>
          <p className="text-lg font-semibold">{stats.connections}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-gray-600">Latency</span>
          </div>
          <p className="text-lg font-semibold">{stats.latency} ms</p>
        </div>
      </div>
    </div>
  );
};