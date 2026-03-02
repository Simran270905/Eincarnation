import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // Force a small delay to ensure React Helmet has processed the new page's SEO component
    const timer = setTimeout(() => {
      // This ensures the document title is updated even if React Helmet doesn't trigger immediately
      // The actual title will be set by the SEO component on each page
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default TitleUpdater;
