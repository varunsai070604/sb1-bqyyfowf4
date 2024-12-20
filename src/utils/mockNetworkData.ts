import { NetworkStats, ConnectionDetail } from '../types/network';

export const getMockNetworkStats = (): NetworkStats => ({
  inbound: Math.floor(Math.random() * 500) + 100,
  outbound: Math.floor(Math.random() * 300) + 50,
  connections: Math.floor(Math.random() * 20) + 5,
  latency: Math.floor(Math.random() * 100) + 10,
  packetLoss: Number((Math.random() * 2).toFixed(2)),
  protocols: {
    http: Math.floor(Math.random() * 20) + 10,
    https: Math.floor(Math.random() * 70) + 30,
    other: Math.floor(Math.random() * 10)
  }
});

export const getMockConnections = (): ConnectionDetail[] => [
  {
    id: '1',
    protocol: 'HTTPS',
    source: '192.168.1.100:443',
    destination: 'cdn.example.com:443',
    status: 'active',
    bytesTransferred: Math.floor(Math.random() * 20000) + 5000,
    timestamp: Date.now()
  },
  {
    id: '2',
    protocol: 'HTTP',
    source: '192.168.1.100:80',
    destination: 'api.example.com:80',
    status: 'active',
    bytesTransferred: Math.floor(Math.random() * 10000) + 2000,
    timestamp: Date.now()
  },
  {
    id: '3',
    protocol: 'HTTPS',
    source: '192.168.1.100:443',
    destination: 'storage.example.com:443',
    status: 'closed',
    bytesTransferred: Math.floor(Math.random() * 8000) + 1000,
    timestamp: Date.now()
  }
];