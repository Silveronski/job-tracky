type CurrentUser = {
    name: string,
    token: string | null,
    avatar: string | null
};

type UserAuth = { 
    email: string,
    password: string
};

type ResetPassword = UserAuth & { verificationCode: string };