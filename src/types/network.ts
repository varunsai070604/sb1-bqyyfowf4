export interface NetworkStats {
  inbound: number;
  outbound: number;
  connections: number;
  latency: number;
  packetLoss: number;
  protocols: {
    http: number;
    https: number;
    other: number;
  };
}

export interface ConnectionDetail {
  id: string;
  protocol: string;
  source: string;
  destination: string;
  status: 'active' | 'closed';
  bytesTransferred: number;
  timestamp: number;
}