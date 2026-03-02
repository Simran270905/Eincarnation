import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'E-Incarnation Recycling Pvt. Ltd. - Professional E-Waste Management',
  description = 'Leading e-waste recycling company in India. We provide comprehensive EPR solutions, IT asset disposition, and environmentally responsible electronics recycling services across India.',
  keywords = 'e-waste recycling, EPR services, IT asset disposition, electronics recycling India, ITAD, extended producer responsibility, e-waste management, electronic waste disposal',
  canonical = '',
  ogType = 'website',
  ogImage = '/og-image.jpg',
  twitterCard = 'summary_large_image',
  noindex = false
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://eincarnation.in';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${window.location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="E-Incarnation Recycling" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional SEO */}
      <meta name="language" content="English" />
      <meta name="author" content="E-Incarnation Recycling Pvt. Ltd." />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      
      {/* Mobile Meta Tags */}
      <meta name="theme-color" content="#1A0185" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
};

export default SEO;
