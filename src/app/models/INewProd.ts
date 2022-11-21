export interface INewProd {
  category: string;
  productName: string;
  quantity: number;
  unitCost: number;
  orderDate: string;
}

export interface RespINewProd
{
  success: boolean;
  errorMessage: string;
  debugMessage: string;
  data: {
    id: number;
    category: string;
    productName: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    orderDate: string;
  };
}
//crea un nuovo prodotto
