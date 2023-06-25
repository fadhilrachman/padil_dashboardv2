interface RequestRegister {
  nama: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface RequestLogin {
  email: string;
  password: string;
}

export type { RequestRegister, RequestLogin };
