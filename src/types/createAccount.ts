export type CreateSession = {
  isAuth: boolean;
  needPassword: boolean;
  needCode: boolean;
  session: string;
  codeType: string;
  phoneCodeHash: string;
};
