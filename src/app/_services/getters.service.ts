import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { error } from 'util';

@Injectable({ providedIn: 'root' })
export class GetterServices {

    constructor(private http: HttpClient) {}

    listaPessoas() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaPessoas`)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    buscaCandidato(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/buscarCandidato/` + id)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    salvarOpcaoVoto(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/salvarOpcaoVoto/` + id)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    listaVotacao() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaVotacao`)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    listaVotos() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaVotos`)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }

    listaLogs() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaLogs`)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    listaUrnas() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaUrnas`)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    listaCandidatos() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/listaCandidatos`)
            .pipe(map((user) => {
                if (user != null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }

    verificaVotacaoAtivada() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/verificaVotacaoAtivada`)
        .pipe(map((votacao) => {
            if (votacao) {
                if (votacao.Status === 'Iniciada' || votacao.Status === 'Contagem') {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }));
    }
    verificaVotacaoAtivadaVotos() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/verificaVotacaoAtivada`)
        .pipe(map((votacao) => {
            if (votacao) {
                if (votacao.Status === 'Iniciada') {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }));
    }
    verificaAgendamentoVotacao() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/statusAgendamentoVotacao`)
        .pipe(map(() => {
                return null;
        }));
    }
    verificaStatusVotacao() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/verificaStatusVotacao`)
        .pipe(map((votacao) => {
            if (votacao) {
                return votacao;
            } else {
                return null;
            }
        }));
    }

    buscarPessoa(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/buscarPessoa/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    buscarPessoaNav(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/buscarPessoaNav/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    buscarUrna(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/buscarUrna/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    verificaUrnaAtivada() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/verificaVotacaoAtivada/`)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    contaCandidatos() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/contaCandidatos/`)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    contaCadastrados() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/contaCadastrados/`)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    contaVotos() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/contaVotos/`)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    datasVotacaoIniciada() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/datasVotacao/`)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    encerraVotacao(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/encerraVotacao/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    finalizarVotacao(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/finalizarVotacao/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    contaUrnas() {
        return this.http.get<any>(`http://127.0.0.1:8000/api/contaUrnas/`)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    apagarPessoa(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apagarPessoa/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    apagarCandidato(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apagarCandidato/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
    apagarUrna(id) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apagarUrna/` + id)
            .pipe(map((user) => {
                if (user !== null) {
                    return user;
                } else {
                    return error('Username or password is incorrect');
                }
            }));
    }
}
