export interface IUser {
  name: string;
  email: string;
  password: string;
  photoURL: string;
  token?: string;
  // role: "USER" | "ADMIN" | "SUPERADMIN";
  // address: {
  //   city: string;
  //   street: string;
  //   zip: number;
  // };
}
