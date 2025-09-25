export interface BannerContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface BannerStyles {
  backgroundColor: {
    primary: string;
    secondary: string;
  };
  textColor: {
    primary: string;
    secondary: string;
  };
  spacing: {
    desktop: {
      padding: string;
      gap: string;
    };
    mobile: {
      padding: string;
      gap: string;
    };
  };
} 