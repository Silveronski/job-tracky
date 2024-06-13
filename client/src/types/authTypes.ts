export type CurrentUser = {
    name: string,
    token: string | null,
    avatar: string | null
};

export type UserAuth = { 
    email: string,
    password: string
};

export type ResetPassword = UserAuth & { verificationCode: string };