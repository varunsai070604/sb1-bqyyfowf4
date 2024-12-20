import React from 'react';
import { Activity, ArrowDown, ArrowUp, Clock, WifiOff } from 'lucide-react';
import { NetworkStats } from '../../types/network';

interface NetworkOverviewProps {
  stats: NetworkStats;
}

export const NetworkOverview: React.FC<NetworkOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ArrowDown className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600">Inbound</span>
        </div>
        <p className="text-lg font-semibold">{stats.inbound} KB/s</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUp className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-600">Outbound</span>
        </div>
        <p className="text-lg font-semibold">{stats.outbound} KB/s</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-purple-500" />
          <span className="text-sm text-gray-600">Connections</span>
        </div>
        <p className="text-lg font-semibold">{stats.connections}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-gray-600">Latency</span>
        </div>
        <p className="text-lg font-semibold">{stats.latency} ms</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <WifiOff className="h-4 w-4 text-red-500" />
          <span className="text-sm text-gray-600">Packet Loss</span>
        </div>
        <p className="text-lg font-semibold">{stats.packetLoss}%</p>
      </div>
    </div>
  );
};