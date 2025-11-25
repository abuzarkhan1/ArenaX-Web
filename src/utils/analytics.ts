import ReactGA from "react-ga4";

// Initialize Google Analytics 4
// Replace 'YOUR_MEASUREMENT_ID' with your actual Measurement ID (e.g., G-XXXXXXXXXX)
export const initGA = () => {
  ReactGA.initialize("G-TE33KZTQP0", {
    gtagOptions: {
      debug_mode: true
    }
  }); 
};
// Log a custom event
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

// Log a page view (optional, GA4 does this automatically for history changes if configured, but good for manual control)
export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
