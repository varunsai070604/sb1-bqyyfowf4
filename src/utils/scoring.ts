import { urlPatterns } from './patterns';

interface UrlAnalysis {
  hasSuspiciousWords: boolean;
  isSecureProtocol: boolean;
  hasCommonTLD: boolean;
  hasSuspiciousChars: boolean;
  isIPAddress: boolean;
  hasExcessiveSubdomains: boolean;
}

export const analyzeUrlPatterns = (url: string): UrlAnalysis => {
  return {
    hasSuspiciousWords: urlPatterns.suspicious.test(url),
    isSecureProtocol: urlPatterns.secureProtocol.test(url),
    hasCommonTLD: urlPatterns.commonTLD.test(url),
    hasSuspiciousChars: urlPatterns.suspiciousChars.test(url),
    isIPAddress: urlPatterns.ipAddress.test(url),
    hasExcessiveSubdomains: urlPatterns.excessiveSubdomains.test(url)
  };
};

export const calculateRiskScores = (url: string) => {
  const analysis = analyzeUrlPatterns(url);
  
  let scores = {
    malware: 20,
    phishing: 15,
    spam: 10,
    unwantedSoftware: 25,
    privacyRisks: 30
  };

  if (!analysis.isSecureProtocol) {
    scores.privacyRisks += 30;
    scores.phishing += 20;
  }

  if (analysis.hasSuspiciousWords) {
    scores.spam += 40;
    scores.phishing += 25;
  }

  if (analysis.hasSuspiciousChars) {
    scores.malware += 35;
    scores.unwantedSoftware += 20;
  }

  if (analysis.isIPAddress) {
    scores.malware += 25;
    scores.phishing += 30;
  }

  if (analysis.hasExcessiveSubdomains) {
    scores.phishing += 20;
    scores.privacyRisks += 15;
  }

  if (!analysis.hasCommonTLD) {
    scores.malware += 15;
    scores.phishing += 15;
  }

  Object.keys(scores).forEach(key => {
    scores[key as keyof typeof scores] = Math.min(Math.max(scores[key as keyof typeof scores], 0), 100);
  });

  return scores;
};