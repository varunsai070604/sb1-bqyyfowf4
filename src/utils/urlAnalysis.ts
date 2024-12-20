import { RiskAnalysis } from '../types/risk';
import { urlPatterns } from './patterns';
import { calculateRiskScores } from './scoring';
import { getRiskDescription } from './descriptions';
import { getRecommendations } from './recommendations';

const analyzeUrlStructure = (url: string) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const path = urlObj.pathname;
    const query = urlObj.search;
    
    let baseScore = 0;
    
    // Domain analysis
    if (domain.includes('ip-')) baseScore += 30;
    if (domain.startsWith('www2') || domain.startsWith('web-')) baseScore += 15;
    if (domain.includes('-secure-') || domain.includes('-safety-')) baseScore += 20;
    if (domain.includes('banking') || domain.includes('login')) baseScore += 25;
    
    // Path analysis
    if (path.includes('download') || path.includes('setup')) baseScore += 20;
    if (path.includes('login') || path.includes('signin')) baseScore += 15;
    if (path.includes('update') || path.includes('patch')) baseScore += 25;
    
    // Query analysis
    if (query.includes('redirect') || query.includes('return')) baseScore += 20;
    if (query.includes('token') || query.includes('auth')) baseScore += 15;
    
    return Math.min(baseScore, 100);
  } catch {
    return 80; // Invalid URL structure is suspicious
  }
};

const analyzeUrlContent = (url: string) => {
  let score = 0;
  
  // Check for suspicious words
  const suspiciousWords = [
    'free', 'win', 'prize', 'lucky', 'bonus', 'special', 'exclusive',
    'limited', 'urgent', 'important', 'account', 'verify', 'suspended'
  ];
  
  suspiciousWords.forEach(word => {
    if (url.toLowerCase().includes(word)) {
      score += 15;
    }
  });
  
  // Check for number sequences
  if (/\d{6,}/.test(url)) score += 20;
  
  // Check for mixed character sets
  if (/[A-Za-z][0-9][A-Za-z]/.test(url)) score += 15;
  
  return Math.min(score, 100);
};

export const analyzeUrl = (url: string): RiskAnalysis => {
  const structureScore = analyzeUrlStructure(url);
  const contentScore = analyzeUrlContent(url);
  const patterns = calculateRiskScores(url);
  
  // Weighted combination of different analysis methods
  const calculateFinalScore = (base: number, pattern: number, content: number) => {
    return Math.round((base * 0.4) + (pattern * 0.3) + (content * 0.3));
  };
  
  const scores = {
    malware: calculateFinalScore(structureScore, patterns.malware, contentScore),
    phishing: calculateFinalScore(structureScore, patterns.phishing, contentScore * 1.2),
    spam: calculateFinalScore(contentScore * 1.3, patterns.spam, structureScore * 0.7),
    unwantedSoftware: calculateFinalScore(structureScore * 1.1, patterns.unwantedSoftware, contentScore),
    privacyRisks: calculateFinalScore(patterns.privacyRisks, structureScore, contentScore * 0.9)
  };

  return {
    malware: {
      type: 'malware',
      severity: scores.malware >= 70 ? 'high' : scores.malware >= 40 ? 'moderate' : 'low',
      percentage: scores.malware,
      description: getRiskDescription('malware', scores.malware),
      recommendations: getRecommendations('malware', scores.malware)
    },
    phishing: {
      type: 'phishing',
      severity: scores.phishing >= 70 ? 'high' : scores.phishing >= 40 ? 'moderate' : 'low',
      percentage: scores.phishing,
      description: getRiskDescription('phishing', scores.phishing),
      recommendations: getRecommendations('phishing', scores.phishing)
    },
    spam: {
      type: 'spam',
      severity: scores.spam >= 70 ? 'high' : scores.spam >= 40 ? 'moderate' : 'low',
      percentage: scores.spam,
      description: getRiskDescription('spam', scores.spam),
      recommendations: getRecommendations('spam', scores.spam)
    },
    unwantedSoftware: {
      type: 'unwantedSoftware',
      severity: scores.unwantedSoftware >= 70 ? 'high' : scores.unwantedSoftware >= 40 ? 'moderate' : 'low',
      percentage: scores.unwantedSoftware,
      description: getRiskDescription('unwantedSoftware', scores.unwantedSoftware),
      recommendations: getRecommendations('unwantedSoftware', scores.unwantedSoftware)
    },
    privacyRisks: {
      type: 'privacyRisks',
      severity: scores.privacyRisks >= 70 ? 'high' : scores.privacyRisks >= 40 ? 'moderate' : 'low',
      percentage: scores.privacyRisks,
      description: getRiskDescription('privacyRisks', scores.privacyRisks),
      recommendations: getRecommendations('privacyRisks', scores.privacyRisks)
    }
  };
};