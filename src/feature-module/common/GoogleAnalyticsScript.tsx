import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { GTM_ID } from '../../environment';
// Extend the Window interface
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const GoogleAnalyticsScript: React.FC = () => {
  const trackingId = GTM_ID;

  useEffect(() => {
    if (!trackingId) {
      console.error('Google Tag Manager ID is not set.');
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  }, [trackingId]);

  if (!trackingId) {
    return null;
  }

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalyticsScript;
