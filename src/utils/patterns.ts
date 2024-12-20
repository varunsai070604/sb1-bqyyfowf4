export const urlPatterns = {
  suspicious: /(free|win|lucky|prize|discount)/i,
  secureProtocol: /^https:\/\//,
  commonTLD: /\.(com|org|net|edu|gov)$/,
  suspiciousChars: /[<>{}()|&;]|%[0-9A-Fa-f]{2}/,
  ipAddress: /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
  excessiveSubdomains: /(?:[^./]+\.){4,}/
};