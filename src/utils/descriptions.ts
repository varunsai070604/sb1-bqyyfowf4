export const getRiskDescription = (type: string, score: number): string => {
  if (score >= 70) {
    return getHighRiskDescription(type);
  } else if (score >= 40) {
    return getModerateRiskDescription(type);
  } else {
    return getLowRiskDescription(type);
  }
};

const getHighRiskDescription = (type: string): string => {
  switch (type) {
    case 'malware':
      return 'High risk of malicious software. The URL shows multiple indicators of potential malware distribution.';
    case 'phishing':
      return 'High likelihood of phishing attempt. The URL exhibits characteristics commonly associated with fraudulent websites.';
    case 'spam':
      return 'Strong indicators of spam content. The URL contains patterns typically used in spam campaigns.';
    case 'unwantedSoftware':
      return 'High probability of unwanted software distribution. Exercise extreme caution.';
    case 'privacyRisks':
      return 'Severe privacy concerns detected. The website may collect and misuse personal information.';
    default:
      return 'High risk detected. Exercise caution.';
  }
};

const getModerateRiskDescription = (type: string): string => {
  switch (type) {
    case 'malware':
      return 'Moderate risk of malicious software. Some suspicious patterns detected.';
    case 'phishing':
      return 'Some phishing indicators present. Verify the website\'s authenticity before proceeding.';
    case 'spam':
      return 'Moderate spam indicators detected. The content may be promotional or unwanted.';
    case 'unwantedSoftware':
      return 'Potential presence of unwanted software. Review carefully before downloading.';
    case 'privacyRisks':
      return 'Some privacy concerns identified. Review the privacy policy carefully.';
    default:
      return 'Moderate risk detected. Proceed with caution.';
  }
};

const getLowRiskDescription = (type: string): string => {
  switch (type) {
    case 'malware':
      return 'Low risk of malicious software. No significant threats detected.';
    case 'phishing':
      return 'Low phishing risk. The URL appears legitimate.';
    case 'spam':
      return 'Low spam indicators. The content appears legitimate.';
    case 'unwantedSoftware':
      return 'Low risk of unwanted software. The source appears trustworthy.';
    case 'privacyRisks':
      return 'Minor privacy concerns. Standard web tracking may be present.';
    default:
      return 'Low risk detected. Appears safe to proceed.';
  }
};