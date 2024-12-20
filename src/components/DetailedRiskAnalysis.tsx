import React from 'react';
import { RiskCard } from './risk/RiskCard';
import { RiskAnalysis } from '../types/risk';

interface DetailedRiskAnalysisProps {
  risks: RiskAnalysis;
}

export const DetailedRiskAnalysis: React.FC<DetailedRiskAnalysisProps> = ({ risks }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Detailed Risk Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RiskCard risk={risks.malware} type="malware" />
        <RiskCard risk={risks.phishing} type="phishing" />
        <RiskCard risk={risks.spam} type="spam" />
        <RiskCard risk={risks.unwantedSoftware} type="unwantedSoftware" />
        <RiskCard risk={risks.privacyRisks} type="privacyRisks" />
      </div>
    </div>
  );
};