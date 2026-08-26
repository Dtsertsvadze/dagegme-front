export type LocalizedText = {
  en: string;
  ka: string;
};

export type Provider = {
  id: number;
  name: LocalizedText;
  description?: LocalizedText | string | null;
  profile_photo?: string | null;
  profile_photo_url?: string | null;
};

export type VipProviderType =
  | 'photographer'
  | 'videographer'
  | 'band'
  | 'dj'
  | 'presenter'
  | 'studio';

export type VipCarouselItem = {
  provider_type: VipProviderType;
  provider: Provider & {
    vip: true;
    vip_order: number;
  };
};
