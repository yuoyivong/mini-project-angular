import { Book } from "./book";

export interface BookResponse {
    message : string;
    payload : Book;
    status : number;
}
