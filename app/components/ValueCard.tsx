import { LucideIcon } from 'lucide-react';
import React from 'react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, desc }) => {
  return (
    <div className="p-8 bg-surface border border-stroke rounded-2xl group space-y-8">
      <div className="w-12 h-12 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand">
        <Icon size={24} />
      </div>
      <div className="space-y-4">
        <h4 className="text-2xl font-black tracking-tight uppercase leading-none">{title}</h4>
        <p className="text-text-muted text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
};

export default ValueCard;
