declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.FC<LucideProps>;

  export const Sparkles: LucideIcon;
  export const AtSign: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Flame: LucideIcon;
  export const Gamepad2: LucideIcon;
  export const Headphones: LucideIcon;
  export const Palette: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Zap: LucideIcon;
  export const Lock: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const UserCheck: LucideIcon;
  export const Users: LucideIcon;
  export const Coins: LucideIcon;
  export const CreditCard: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const Video: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Play: LucideIcon;
  export const Heart: LucideIcon;
  export const Eye: LucideIcon;
  export const Award: LucideIcon;
  export const Music: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const User: LucideIcon;
  export const Mail: LucideIcon;
  export const Share2: LucideIcon;
  export const EyeOff: LucideIcon;
  export const FileCheck2: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const UserCheck2: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Shield: LucideIcon;
  export const Fingerprint: LucideIcon;
  export const Scale: LucideIcon;
  export const Loader2: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Pause: LucideIcon;
  export const Volume2: LucideIcon;
  export const VolumeX: LucideIcon;
  export const Bookmark: LucideIcon;
  export const Send: LucideIcon;

  const icons: Record<string, LucideIcon>;
  export default icons;
}
