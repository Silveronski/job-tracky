export type CurrentUser = {
    name: string,
    token: string | null
};

export type UserAuth = { 
    email: string,
    password: string
};

export type UserRegister = UserAuth & { name: string };

export type ResetPassword = UserAuth & { verificationCode: string };

export type AuthApiResponse = string | undefined | object;