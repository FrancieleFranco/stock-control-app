export interface GetAllProductsResponse {
  id: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  category_id: {
    id: string;
    name: string;
  };
}
