import _ReactGA from "react-ga4";

type GA4Instance = {
  initialize: (
    trackerId: string,
    options?: {
      gaOptions?: Record<string, unknown>;
      gtagOptions?: Record<string, unknown>;
    }
  ) => void;
  event: (
    nameOrOptions:
      | string
      | {
          category: string;
          action: string;
          label?: string;
          value?: number;
          nonInteraction?: boolean;
          transport?: "beacon" | "xhr" | "image";
        },
    params?: Record<string, unknown>
  ) => void;
  send: (params: { hitType: string; page?: string; [key: string]: unknown }) => void;
};

// Handle CJS/ESM interop differences across bundlers & runtimes
const resolveGA = (mod: unknown): GA4Instance | null => {
  if (!mod || typeof mod !== "object") return null;
  const record = mod as Record<string, unknown>;
  if (typeof record.initialize === "function") {
    return record as unknown as GA4Instance;
  }
  if (record.default && typeof record.default === "object") {
    const defaultRecord = record.default as Record<string, unknown>;
    if (typeof defaultRecord.initialize === "function") {
      return defaultRecord as unknown as GA4Instance;
    }
    if (defaultRecord.default && typeof defaultRecord.default === "object") {
      const nestedDefault = defaultRecord.default as Record<string, unknown>;
      if (typeof nestedDefault.initialize === "function") {
        return nestedDefault as unknown as GA4Instance;
      }
    }
  }
  return null;
};

const ga = resolveGA(_ReactGA);

// Initialize Google Analytics 4
export const initGA = () => {
  try {
    if (ga && typeof ga.initialize === "function") {
      ga.initialize("G-TE33KZTQP0", {
        gtagOptions: {
          debug_mode: false,
        },
      });
    } else {
      console.warn("ReactGA is not initialized: instance not found");
    }
  } catch (error) {
    console.error("Failed to initialize Google Analytics:", error);
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  try {
    if (ga && typeof ga.event === "function") {
      ga.event({
        category,
        action,
        label,
      });
    }
  } catch (error) {
    console.error("Failed to log GA event:", error);
  }
};

export const logEventGA4 = (eventName: string, eventParams?: Record<string, unknown>) => {
  try {
    if (ga && typeof ga.event === "function") {
      ga.event(eventName, eventParams);
    }
  } catch (error) {
    console.error("Failed to log GA4 event:", error);
  }
};

export const trackDownload = (fileName: string, platform: string, version: string) => {
  try {
    if (ga && typeof ga.event === "function") {
      ga.event("download", {
        file_name: fileName,
        platform: platform,
        app_version: version,
      });
    }
  } catch (error) {
    console.error("Failed to track download:", error);
  }
};

export const trackButtonClick = (buttonName: string, location: string) => {
  try {
    if (ga && typeof ga.event === "function") {
      ga.event("button_click", {
        button_name: buttonName,
        page_location: location,
      });
    }
  } catch (error) {
    console.error("Failed to track button click:", error);
  }
};

export const logPageView = () => {
  try {
    if (ga && typeof ga.send === "function") {
      ga.send({ hitType: "pageview", page: window.location.pathname });
    }
  } catch (error) {
    console.error("Failed to log page view:", error);
  }
};

export const trackUserEngagement = (engagementType: string, duration?: number) => {
  try {
    if (ga && typeof ga.event === "function") {
      ga.event("user_engagement", {
        engagement_type: engagementType,
        engagement_duration: duration,
      });
    }
  } catch (error) {
    console.error("Failed to track user engagement:", error);
  }
};
