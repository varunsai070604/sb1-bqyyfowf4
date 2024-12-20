import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Globe,
  Lock,
  Wifi,
  Bug,
  Fish,
  MessageSquare,
  Package,
  Info,
  Network
} from 'lucide-react';

// Risk type icons mapping
export const riskIcons = {
  malware: Bug,
  phishing: Fish,
  spam: MessageSquare,
  unwantedSoftware: Package,
  privacyRisks: Lock,
  default: Shield
} as const;

// Severity icons mapping
export const severityIcons = {
  high: AlertTriangle,
  moderate: Info,
  low: CheckCircle
} as const;

// Network icons mapping
export const networkIcons = {
  activity: Activity,
  globe: Globe,
  wifi: Wifi,
  network: Network
} as const;