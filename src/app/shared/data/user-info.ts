export interface UserInfoJSON {
    result: string;
    usercol: string;
    userid: string;
}

export class UserInfo {
    result: string;
    usercol: string;
    userid: string;
    
    public static fromJSON(json: UserInfoJSON): UserInfo {
        let userinfo: UserInfo = new UserInfo();
        userinfo.result = json.result;
        userinfo.usercol = json.usercol;
        userinfo.userid = json.userid;
        return userinfo;
    }
}