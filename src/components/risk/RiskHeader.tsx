import React from 'react';
import { riskIcons, severityIcons } from '../icons';
import { RiskDetail } from '../../types/risk';
import { getSeverityColor } from '../../utils/colors';

interface RiskHeaderProps {
  risk: RiskDetail;
  type: string;
}

export const RiskHeader: React.FC<RiskHeaderProps> = ({ risk, type }) => {
  const Icon = riskIcons[type.toLowerCase() as keyof typeof riskIcons] || riskIcons.default;
  const color = getSeverityColor(risk.severity);
  const SeverityIcon = severityIcons[risk.severity];

  return (
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
  );
};