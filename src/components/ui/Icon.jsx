import {
  Activity,
  Bone,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Dumbbell,
  HeartHandshake,
  HeartPulse,
  House,
  MessageSquareText,
  PersonStanding,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCheck,
} from 'lucide-react';

// Icons referenced by name from the data files. Add new ones here when you need them.
const icons = {
  activity: Activity,
  bone: Bone,
  brain: Brain,
  calendarCheck: CalendarCheck,
  clipboardCheck: ClipboardCheck,
  clock: Clock,
  dumbbell: Dumbbell,
  heartHandshake: HeartHandshake,
  heartPulse: HeartPulse,
  house: House,
  messageSquareText: MessageSquareText,
  personStanding: PersonStanding,
  shieldCheck: ShieldCheck,
  target: Target,
  trendingUp: TrendingUp,
  userCheck: UserCheck,
};

export default function Icon({ name, ...props }) {
  const Component = icons[name] ?? Activity;
  return <Component aria-hidden="true" {...props} />;
}
