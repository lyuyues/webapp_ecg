import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: "searchNote",
})
export class SearchNotePipe  implements PipeTransform{
    transform(value:any,args:any):any{
        let keyword = args;
        return keyword ? value.filter(note => {
                keyword = keyword.toLocaleLowerCase();
                let content = note.content ? note.content.toLocaleLowerCase().indexOf(keyword) != -1 :false;
                let created = note.created ? note.created.toLocaleLowerCase().indexOf(keyword) !=-1 : false;
                let time = note.time ? note.time.toLocaleLowerCase().indexOf(keyword) !=-1 : false;
                let test = note.for_test[0] ? note.for_test[0].created.toLocaleLowerCase().indexOf(keyword) !=-1 : false;
                let record = note.for_records[0] ? note.for_records[0].created.toLocaleLowerCase().indexOf(keyword) !=-1 : false;
                let filtered = content || created || time ||test || record;
                return filtered;
        }):value;
    }
}