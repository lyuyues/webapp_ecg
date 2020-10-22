export interface DoctorSignupJSON {
    firstname: string;
    lastname: string;
    gender: string;
    birthday: Date;
    username: string;
    password: string;
    phone: string;
    address: string;
    hospital: string;
    subscribe: boolean;
}

export class DoctorSignup {
    firstname: string;
    lastname: string;
    gender: string;
    birthday: Date;
    username: string;
    password: string;
    phone: string;
    address: string;
    hospital: string;
    subscribe: boolean;
    constructor(    firstname: string,lastname: string,gender: string,birthday: Date,username: string,password: string,phone: string,address: string,hospital: string,subscribe: boolean){
        this.address = address;
        this.birthday = birthday;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.hospital = hospital;
        this.password = password;
        this.phone = phone;
        this.subscribe = subscribe;
        this.username = username;
    }
}