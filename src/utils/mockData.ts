import { RiskAnalysis } from '../types/risk';

export const getMockRiskAnalysis = (): RiskAnalysis => ({
  malware: {
    type: 'malware',
    severity: 'high',
    percentage: 75,
    description: 'High risk of malicious software including trojans, ransomware, and spyware.',
    recommendations: [
      'Install reputable antivirus software',
      'Scan downloaded files before opening',
      'Keep your system and applications updated'
    ]
  },
  phishing: {
    type: 'phishing',
    severity: 'moderate',
    percentage: 45,
    description: 'Moderate risk of fraudulent attempts to obtain sensitive information.',
    recommendations: [
      'Verify sender email addresses carefully',
      'Don\'t click on suspicious links',
      'Enable two-factor authentication'
    ]
  },
  spam: {
    type: 'spam',
    severity: 'low',
    percentage: 20,
    description: 'Low risk of unwanted promotional or bulk messages.',
    recommendations: [
      'Use spam filtering',
      'Never respond to spam messages',
      'Report spam to your email provider'
    ]
  },
  unwantedSoftware: {
    type: 'unwantedSoftware',
    severity: 'moderate',
    percentage: 55,
    description: 'Moderate risk of potentially unwanted programs, adware, and toolbars.',
    recommendations: [
      'Read installation prompts carefully',
      'Use custom installation options',
      'Install software from official sources only'
    ]
  },
  privacyRisks: {
    type: 'privacyRisks',
    severity: 'high',
    percentage: 80,
    description: 'High risk of data collection and privacy violations.',
    recommendations: [
      'Review privacy policies',
      'Use privacy-focused browser extensions',
      'Minimize personal information sharing'
    ]
  }
});