export interface IToken{
  success: boolean;
  errorMessage: string;
  debugMessage: string;
  data: {
    token: string;
    refreshToken: string;
    createdDate: Date;
    expirationDate: Date;
  };
}
