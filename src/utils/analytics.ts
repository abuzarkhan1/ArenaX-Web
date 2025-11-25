import ReactGA from "react-ga4";

// Initialize Google Analytics 4
export const initGA = () => {
  ReactGA.initialize("G-TE33KZTQP0", {
    gtagOptions: {
      debug_mode: true,
    }
  }); 
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};


export const logEventGA4 = (eventName: string, eventParams?: Record<string, any>) => {
  ReactGA.event(eventName, eventParams);
};

export const trackDownload = (fileName: string, platform: string, version: string) => {
  ReactGA.event("download", {
    file_name: fileName,
    platform: platform,
    app_version: version,
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  ReactGA.event("button_click", {
    button_name: buttonName,
    page_location: location,
  });
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const trackUserEngagement = (engagementType: string, duration?: number) => {
  ReactGA.event("user_engagement", {
    engagement_type: engagementType,
    engagement_duration: duration,
  });
};