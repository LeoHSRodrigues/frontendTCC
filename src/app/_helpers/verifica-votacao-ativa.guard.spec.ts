import { TestBed, async, inject } from '@angular/core/testing';

import { VerificaVotacaoAtivaGuard } from './verifica-votacao-ativa.guard';

describe('VerificaVotacaoAtivaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificaVotacaoAtivaGuard]
    });
  });

  it('should ...', inject([VerificaVotacaoAtivaGuard], (guard: VerificaVotacaoAtivaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
