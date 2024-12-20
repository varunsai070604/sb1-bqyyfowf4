import React from 'react';
import { ConnectionDetail } from '../../types/network';

interface ConnectionsListProps {
  connections: ConnectionDetail[];
}

export const ConnectionsList: React.FC<ConnectionsListProps> = ({ connections }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Active Connections</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Transfer</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {connections.map((connection) => (
              <tr key={connection.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{connection.protocol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{connection.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{connection.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    connection.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {connection.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(connection.bytesTransferred / 1024).toFixed(2)} KB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};