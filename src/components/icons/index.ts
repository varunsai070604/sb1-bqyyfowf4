import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Globe,
  Lock,
  Wifi,
  Bug, // Using Bug instead of Virus as it's not available
  Fish,
  MessageSquare,
  Package,
  Info
} from 'lucide-react';

// Risk type icons
export const riskIcons = {
  malware: Bug, // Changed from Virus to Bug
  phishing: Fish,
  spam: MessageSquare,
  unwantedSoftware: Package,
  privacyRisks: Lock,
  default: Shield
};

// Severity icons
export const severityIcons = {
  high: AlertTriangle,
  moderate: Info,
  low: CheckCircle
};

// Network icons
export const networkIcons = {
  activity: Activity,
  globe: Globe,
  wifi: Wifi
};

// Status icons
export const statusIcons = {
  shield: Shield,
  check: CheckCircle,
  warning: AlertTriangle
};