export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'high':
      return 'red';
    case 'moderate':
      return 'yellow';
    case 'low':
      return 'green';
    default:
      return 'gray';
  }
};