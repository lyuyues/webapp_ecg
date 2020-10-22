export interface PatientSignupJSON {
    firstname: string;
    lastname: string;
    gender: string;
    birthday: Date;
    username: string;
    password: string;
    phone: string;
    address: string;
    medical_plan_number: string;
    subscribe: boolean;
}

export class PatientSignup {
    firstname: string;
    lastname: string;
    gender: string;
    birthday: Date;
    username: string;
    password: string;
    phone: string;
    address: string;
    medical_plan_number: string;
    subscribe: boolean;
    constructor(    firstname: string,lastname: string,gender: string,birthday: Date,username: string,password: string,phone: string,address: string,medical_plan_number: string,subscribe: boolean){
        this.address = address;
        this.birthday = birthday;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.medical_plan_number = medical_plan_number;
        this.password = password;
        this.phone = phone;
        this.subscribe = subscribe;
        this.username = username;
    }        

}