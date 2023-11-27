interface RequestParams {
  id: number;
};

export interface ArtAssetRequestParams extends RequestParams {};
export interface ArtAsset {
  id: number;
  name_original: string;
  name_english?: string;
  description?: Record<string, any>; 
  provenance?: Record<string, any>; 
  units: string;
  size_x?: number;
  size_y?: number;
  size_z?: number;
  price?: number;
}