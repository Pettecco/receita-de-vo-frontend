export interface RecipeDTO {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string;
  authorId: string;
  likes: number;
  comments: { author: string; text: string }[];
  createdAt: string;
  image?: string;
  views: number;
}
