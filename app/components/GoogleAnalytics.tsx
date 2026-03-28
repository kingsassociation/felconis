"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-7RV43P5TJ3";

export default function GoogleAnalytics() {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;
    
    const consent = localStorage.getItem("felconis_cookie_consent");
    
    // Track PageView only if consent is allowed and on route changes
    if (window.gtag && consent === "allowed") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname, loaded]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => setLoaded(true)}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Default consent status
            const savedConsent = localStorage.getItem('felconis_cookie_consent');
            gtag('consent', 'default', {
              'ad_storage': savedConsent === 'allowed' ? 'granted' : 'denied',
              'analytics_storage': savedConsent === 'allowed' ? 'granted' : 'denied'
            });

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
