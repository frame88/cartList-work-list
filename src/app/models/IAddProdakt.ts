export interface IAddProdakt {
  success: boolean;
  errorMessage: string;
  debugMessage: string;
  data: {
    id: 0;
    category: string;
    productName: string;
    quantity: 0;
    unitCost: 0;
    totalCost: 0;
    orderDate: string;
  };
}
