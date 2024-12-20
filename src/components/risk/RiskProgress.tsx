import React from 'react';
import { RiskDetail } from '../../types/risk';
import { getSeverityColor } from '../../utils/colors';

interface RiskProgressProps {
  risk: RiskDetail;
}

export const RiskProgress: React.FC<RiskProgressProps> = ({ risk }) => {
  const color = getSeverityColor(risk.severity);

  return (
    <div className="mb-3">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-${color}-500 h-2 rounded-full`}
          style={{ width: `${risk.percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-sm text-gray-600">Risk Level</span>
        <span className="text-sm font-medium">{risk.percentage}%</span>
      </div>
    </div>
  );
};