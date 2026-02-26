"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const FB_PIXEL_ID = "1250353437241453";

export default function FacebookPixel() {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;
    
    const consent = localStorage.getItem("felconis_cookie_consent");
    
    // Track PageView only if consent is allowed and on route changes
    if (window.fbq && consent === "allowed") {
      window.fbq("track", "PageView");
    }
  }, [pathname, loaded]);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
            fbq('init', '${FB_PIXEL_ID}');
            
            // Check for existing consent
            if (localStorage.getItem('felconis_cookie_consent') === 'allowed') {
              fbq('track', 'PageView');
            }
          `,
        }}
        onLoad={() => setLoaded(true)}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}
