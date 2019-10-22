import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { error } from 'util';
import { User } from '../_models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usuario')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    login(CPF: string, Senha: string) {
        return this.http.post<any>(`http://127.0.0.1:8000/api/login`, { CPF, Senha })
            .pipe(map((user) => {
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
    loginUrna(formulario) {
        return this.http.post<any>(`http://127.0.0.1:8000/api/loginUrna`, formulario)
        .pipe(map((aa) => {
            if (aa) {
                return aa;
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    logout() {
        localStorage.removeItem('usuario');
        this.currentUserSubject.next(null);
    }
    cadastroUrna(formulario) {
       return this.http.post<any>(`http://127.0.0.1:8000/api/cadastroUrna`, {formulario})
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    cadastroPessoa(formulario) {
        return this.http.post<any>(`http://127.0.0.1:8000/api/cadastroPessoa`, formulario)
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    cadastroCandidato(formulario) {
        return this.http.post<any>(`http://127.0.0.1:8000/api/cadastroCandidato`, formulario)
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    opcoesVotacao(formulario) {
        return this.http.post<any>(`http://127.0.0.1:8000/api/opcoesVotacao`, formulario)
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    atualizarPessoa(formulario) {
       return this.http.post<any>(`http://127.0.0.1:8000/api/atualizarPessoa`, formulario)
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    atualizarUrna(formulario) {
       return this.http.post<any>(`http://127.0.0.1:8000/api/atualizarUrna`, {formulario})
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    atualizarCandidato(formulario) {
       return this.http.post<any>(`http://127.0.0.1:8000/api/atualizarCandidato`, formulario)
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
    removerCandidatura(id) {
       return this.http.get<any>(`http://127.0.0.1:8000/api/removerCandidatura/` + id)
        .pipe(map((aa) => {
            if (aa != null) {
                return 'cadastrado';
            } else {
                return error('Usuário já cadastrado');
            }
        }));
    }
}
