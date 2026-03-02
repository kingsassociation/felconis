"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { FileText, Image as ImageIcon, UploadCloud } from "lucide-react";
import Script from "next/script";
import { useState } from "react";

interface CloudinaryAssetInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function CloudinaryAssetInput({
  label,
  name,
  defaultValue = "",
  placeholder = "HTTPS://CLOUDINARY.COM/...",
  aspectRatio = "video",
  className = "",
}: CloudinaryAssetInputProps) {
  const [url, setUrl] = useState(defaultValue);

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[4/5]",
  };

  const handleUpload = () => {
    if (typeof window !== "undefined" && window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dcbpwzeha",
          uploadPreset: "felconis",
          folder: "felconis",
          sources: ["local", "url", "camera"],
          multiple: false,
          defaultSource: "local",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#E2E8F0",
              tabIcon: "#0D0D12",
              menuIcons: "#5E636E",
              textDark: "#0D0D12",
              textLight: "#FFFFFF",
              link: "#0D0D12",
              action: "#0D0D12",
              inactiveTabIcon: "#94A3B8",
              error: "#E11D48",
              inProgress: "#4F46E5",
              complete: "#10B981",
              sourceBg: "#F8FAFC"
            },
          }
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            // Use public_id as the canonical reference
            setUrl(result.info.public_id);
          }
        }
      );
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Script 
        src="https://upload-widget.cloudinary.com/global/all.js" 
        strategy="lazyOnload"
      />
      
      <div className={`${aspectRatioClasses[aspectRatio]} w-full rounded-2xl bg-surface border border-stroke overflow-hidden relative group shadow-sm`}>
        {url ? (
          <img
            src={getCloudinaryUrl(url)}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-muted/30 gap-4">
            <ImageIcon size={48} strokeWidth={1} />
            <span className="text-[8px] font-brand tracking-widest text-center uppercase">Asset Pending<br />Synchronization</span>
          </div>
        )}
        
        <button 
          type="button"
          onClick={handleUpload}
          className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
        >
          <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <UploadCloud size={18} className="text-brand" />
            <span className="text-[10px] font-brand tracking-widest text-brand uppercase">Institutional Upload</span>
          </div>
        </button>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-brand tracking-widest text-brand ml-1 uppercase">{label}</label>
        <div className="relative">
          <input
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
          />
          <div className="absolute right-3 top-3.5 text-text-muted/20">
            <FileText size={14} />
          </div>
        </div>
        <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-text-muted px-1 text-center">Institutional Media Protocol Active</p>
      </div>
    </div>
  );
}
