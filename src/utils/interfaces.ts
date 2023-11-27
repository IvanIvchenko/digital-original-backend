interface RequestParams {
  id: number;
};

export interface ArtAssetRequestParams extends RequestParams {};

export interface Artist {
  id: number;
  name: string;
  photo?: string; 
  biography?: Record<string, any>; 
  gender?: string;
  alive: boolean;
  addresses?: string;
}