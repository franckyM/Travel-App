export type DestinationCategory =
  | "Beaches"
  | "Mountains"
  | "Cities"
  | "Forests"
  | "Lakes"
  | "Historical Sites"
  | "National Parks"
  | "Islands"
  | "Deserts";

export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  duration: number; // Représente le nombre de jours
  location: string;
  price: number;
  category: DestinationCategory;
}
