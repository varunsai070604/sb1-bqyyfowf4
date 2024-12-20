import React from 'react';
import { Lock, Globe, Network } from 'lucide-react';
import { NetworkStats } from '../../types/network';

interface ProtocolDistributionProps {
  protocols: NetworkStats['protocols'];
}

export const ProtocolDistribution: React.FC<ProtocolDistributionProps> = ({ protocols }) => {
  const total = protocols.http + protocols.https + protocols.other;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Protocol Distribution</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-500" />
              <span className="text-sm">HTTPS</span>
            </div>
            <span className="text-sm font-medium">{((protocols.https / total) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(protocols.https / total) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">HTTP</span>
            </div>
            <span className="text-sm font-medium">{((protocols.http / total) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${(protocols.http / total) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Other</span>
            </div>
            <span className="text-sm font-medium">{((protocols.other / total) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-500 h-2 rounded-full"
              style={{ width: `${(protocols.other / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};