export type PlacesAPIResponse = {
  html_attributions: any[];
  next_page_token: string;
  results: Result[];
  status: string;
};

export type Result = {
  business_status: BusinessStatus;
  geometry: Geometry;
  icon: string;
  icon_background_color: IconBackgroundColor;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code?: PlusCode;
  price_level?: number;
  rating: number;
  reference: string;
  scope: Scope;
  types: Type[];
  user_ratings_total: number;
  vicinity: string;
  permanently_closed?: boolean;
};

export enum BusinessStatus {
  ClosedTemporarily = "CLOSED_TEMPORARILY",
  Operational = "OPERATIONAL",
}

export type Geometry = {
  location: Location;
  viewport: Viewport;
};

export type Location = {
  lat: number;
  lng: number;
};

export type Viewport = {
  northeast: Location;
  southwest: Location;
};

export enum IconBackgroundColor {
  Ff9E67 = "#FF9E67",
}

export type OpeningHours = {
  open_now: boolean;
};

export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type PlusCode = {
  compound_code: string;
  global_code: string;
};

export enum Scope {
  Google = "GOOGLE",
}

export enum Type {
  Bakery = "bakery",
  Bar = "bar",
  Establishment = "establishment",
  Food = "food",
  MealDelivery = "meal_delivery",
  MealTakeaway = "meal_takeaway",
  PointOfInterest = "point_of_interest",
  Restaurant = "restaurant",
  Store = "store",
}
