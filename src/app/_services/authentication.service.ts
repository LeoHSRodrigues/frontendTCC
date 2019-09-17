import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models/usuario';
import { error } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usuario')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    login(CPF: string, Senha: string) {
        return this.http.post<any>(`http://127.0.0.1:8000/api/login`, { CPF, Senha })
            .pipe(map(user => {
                if (user != null) {
                    localStorage.setItem('usuario', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }


    loginDigital(user) {
                    localStorage.setItem('usuario', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
    }

    logout() {
        localStorage.removeItem('usuario');
        this.currentUserSubject.next(null);
    }

    cadastro(formulario) {
       return this.http.post<any>(`http://127.0.0.1:8000/api/cadastro`, {formulario})
        .pipe(map(aa => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
}
