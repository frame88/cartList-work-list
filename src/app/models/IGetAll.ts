export interface IGetAll {
  success: boolean;
  errorMessage: string;
  debugMessage: string;
  data: Products[];
 }

export interface Products{
  id: number;
  category: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  orderDate: string;
}

