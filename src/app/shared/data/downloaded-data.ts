export class DownloadData {
    from:string;
    to: string;
    length: string;
    userid: string;
    recordid: string;
    channal_1: number;
    channal_2: number;
    constructor(from: string,to: string,length: string,userid: string,recordid: string,channal1:number,channal2: number){
        this.from = from;
        this.to = to;
        this.length = length;
        this.userid = userid;
        this.recordid = recordid;
        this.channal_1 = channal1;
        this.channal_2 = channal2;
    }
}