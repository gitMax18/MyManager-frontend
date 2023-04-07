export type AuthData = {
    email: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    data: AuthApi;
};

export type AuthApi = {
    id: number;
    token: string;
};
