export interface Theme {
  name: string;
  gradient: string;
  primary: string;
  primaryHover: string;
  accent: string;
  accentHover: string;
  completed: string;
  icon: string;
}

export const themes: Record<string, Theme> = {
  blue: {
    name: 'Ocean Blue',
    gradient: 'from-blue-50 to-indigo-100',
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    accent: 'bg-indigo-600',
    accentHover: 'hover:bg-indigo-700',
    completed: 'bg-green-500 border-green-500',
    icon: '🌊',
  },
  purple: {
    name: 'Royal Purple',
    gradient: 'from-purple-50 to-pink-100',
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    accent: 'bg-purple-600',
    accentHover: 'hover:bg-purple-700',
    completed: 'bg-green-500 border-green-500',
    icon: '👑',
  },
  green: {
    name: 'Forest Green',
    gradient: 'from-emerald-50 to-teal-100',
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    accent: 'bg-emerald-600',
    accentHover: 'hover:bg-emerald-700',
    completed: 'bg-teal-500 border-teal-500',
    icon: '🌲',
  },
  orange: {
    name: 'Sunset Orange',
    gradient: 'from-orange-50 to-red-100',
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    accent: 'bg-orange-600',
    accentHover: 'hover:bg-orange-700',
    completed: 'bg-green-500 border-green-500',
    icon: '🌅',
  },
  pink: {
    name: 'Bubble Gum',
    gradient: 'from-pink-50 to-rose-100',
    primary: 'bg-pink-600',
    primaryHover: 'hover:bg-pink-700',
    accent: 'bg-pink-600',
    accentHover: 'hover:bg-pink-700',
    completed: 'bg-green-500 border-green-500',
    icon: '🍬',
  },
  cyan: {
    name: 'Tropical Cyan',
    gradient: 'from-cyan-50 to-blue-100',
    primary: 'bg-cyan-600',
    primaryHover: 'hover:bg-cyan-700',
    accent: 'bg-cyan-600',
    accentHover: 'hover:bg-cyan-700',
    completed: 'bg-green-500 border-green-500',
    icon: '🏝️',
  },
  amber: {
    name: 'Golden Amber',
    gradient: 'from-amber-50 to-yellow-100',
    primary: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    accent: 'bg-amber-600',
    accentHover: 'hover:bg-amber-700',
    completed: 'bg-green-500 border-green-500',
    icon: '⭐',
  },
  rose: {
    name: 'Rose Garden',
    gradient: 'from-rose-50 to-pink-100',
    primary: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    accent: 'bg-rose-600',
    accentHover: 'hover:bg-rose-700',
    completed: 'bg-green-500 border-green-500',
    icon: '🌹',
  },
};
