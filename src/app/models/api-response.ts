import { Book } from "./book";

export interface ApiResponse {
    message : string;
    payload : Book;
    status : number;
}
