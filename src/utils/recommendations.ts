const commonRecommendations = [
  'Keep your antivirus software updated',
  'Use a modern, secure web browser',
  'Enable automatic security updates'
];

const getHighRiskRecommendations = (type: string): string[] => {
  switch (type) {
    case 'malware':
      return [
        'Do not download any files from this website',
        'Run a full system scan if you\'ve visited this site',
        'Report this URL to security authorities',
        ...commonRecommendations
      ];
    case 'phishing':
      return [
        'Do not enter any personal information',
        'Verify the website\'s SSL certificate',
        'Check for misspellings and suspicious domains',
        ...commonRecommendations
      ];
    case 'spam':
      return [
        'Block this sender/domain',
        'Report as spam to your email provider',
        'Do not click on any links',
        ...commonRecommendations
      ];
    default:
      return commonRecommendations;
  }
};

export const getRecommendations = (type: string, score: number): string[] => {
  if (score >= 70) {
    return getHighRiskRecommendations(type);
  } else if (score >= 40) {
    return [
      'Proceed with caution',
      'Verify the website\'s authenticity',
      'Monitor for suspicious activity',
      ...commonRecommendations
    ];
  } else {
    return [
      'Practice standard security measures',
      'Keep security software updated',
      'Report any suspicious activity'
    ];
  }
};