import React from 'react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image, bio }) => {
  return (
    <div className="group space-y-6">
      <div className="aspect-[4/5] bg-white border border-stroke rounded-2xl overflow-hidden relative shadow-sm transition-all duration-700 hover:border-brand/40">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-brand/[0.01]" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight leading-tight">{name}</h3>
          <p className="text-[10px] font-black text-brand uppercase tracking-widest">{role}</p>
        </div>
        <p className="text-sm text-text-muted leading-relaxed font-medium line-clamp-3">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
