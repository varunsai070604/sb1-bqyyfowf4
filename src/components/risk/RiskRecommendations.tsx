import React from 'react';

interface RiskRecommendationsProps {
  recommendations: string[];
}

export const RiskRecommendations: React.FC<RiskRecommendationsProps> = ({ recommendations }) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="mt-3">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};