import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { error } from 'util';

@Injectable({ providedIn: 'root' })
export class GetterServices {


    constructor(private http: HttpClient) {
    }



    listaPessoas() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaPessoas`)
            .pipe(map(user => {
                if (user != null) {



                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
}
