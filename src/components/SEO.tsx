import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: object;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://bekheet.com/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes('|') ? title : `${title} | Mohamed Bekheet`;
  const url = canonical || `https://bekheet.com/`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohamed Bekheet',
  url: 'https://bekheet.com/',
  email: 'mailto:mohamed@bekheet.com',
  jobTitle: 'Machine Learning Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Ain Shams University' },
    { '@type': 'CollegeOrUniversity', name: 'University of Ottawa' },
  ],
  knowsAbout: [
    'Machine Learning',
    'Computer Vision',
    'Generative AI',
    'MLOps',
    'Natural Language Processing',
    'Optical Character Recognition',
    'Retrieval-Augmented Generation',
    'AWS Bedrock',
    'AWS SageMaker',
  ],
  sameAs: [
    'https://github.com/mo-bekheet',
    'https://www.linkedin.com/in/mohamed-bekheet-ai',
    'https://www.kaggle.com/mohamedbakhet',
    'https://mohamed-bekheet.medium.com/',
    'https://dev.to/mohamed-bekheet',
    'https://www.credly.com/users/mohamed-bekheet',
  ],
};