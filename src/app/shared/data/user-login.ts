export interface UserLoginJSON {
    username: string;
    password: string;
}

export class UserLogin {
    username: string;
    password: string;

    public static fromJSON(json: UserLoginJSON): UserLogin {
        let userLogin: UserLogin = new UserLogin();
        userLogin.username = json.username;
        userLogin.password = json.password;
        return userLogin;
    }
}