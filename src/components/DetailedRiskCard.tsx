import React from 'react';
import { riskIcons, severityIcons } from './icons';
import { RiskDetail } from '../types/risk';
import { getSeverityColor } from '../utils/colors';

interface DetailedRiskCardProps {
  risk: RiskDetail;
  type: string;
}

export const DetailedRiskCard: React.FC<DetailedRiskCardProps> = ({ risk, type }) => {
  const Icon = riskIcons[type.toLowerCase() as keyof typeof riskIcons] || riskIcons.default;
  const color = getSeverityColor(risk.severity);
  const SeverityIcon = severityIcons[risk.severity];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 text-${color}-500`} />
          <h3 className="font-semibold text-gray-800 capitalize">{type}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 flex items-center gap-1`}>
          <SeverityIcon className="h-3 w-3" />
          {risk.severity.toUpperCase()}
        </span>
      </div>

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

      <p className="text-sm text-gray-600 mb-3">{risk.description}</p>

      {risk.recommendations.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            {risk.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};