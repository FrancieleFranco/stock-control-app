export interface GetAllProductsResponse {
  id: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  category: {
    id: string;
    name: string;
  };
}
