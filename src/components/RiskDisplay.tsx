import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface RiskDisplayProps {
  riskScore: number;
}

export const RiskDisplay: React.FC<RiskDisplayProps> = ({ riskScore }) => {
  const getRiskLevel = () => {
    if (riskScore >= 70) return { level: 'High', color: 'red', Icon: AlertTriangle };
    if (riskScore >= 30) return { level: 'Moderate', color: 'yellow', Icon: Shield };
    return { level: 'Low', color: 'green', Icon: CheckCircle };
  };

  const { level, color, Icon } = getRiskLevel();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Risk Assessment</h3>
        <Icon className={`h-6 w-6 text-${color}-500`} />
      </div>
      
      <div className="space-y-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${color}-600 bg-${color}-200`}>
                {level} Risk
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-gray-600">
                {riskScore}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${riskScore}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};