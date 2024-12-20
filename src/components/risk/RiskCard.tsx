import React from 'react';
import { RiskDetail } from '../../types/risk';
import { RiskHeader } from './RiskHeader';
import { RiskProgress } from './RiskProgress';
import { RiskRecommendations } from './RiskRecommendations';

interface RiskCardProps {
  risk: RiskDetail;
  type: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk, type }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <RiskHeader risk={risk} type={type} />
      <RiskProgress risk={risk} />
      <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
      <RiskRecommendations recommendations={risk.recommendations} />
    </div>
  );
};