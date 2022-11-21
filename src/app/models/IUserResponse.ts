export interface IUserResponse{
  success: boolean;
  errorMessage: string;
  debugMessage: string;
  data: {
    username: string;
    nome: string;
    cognome: string;
    email: string;
  };
}
