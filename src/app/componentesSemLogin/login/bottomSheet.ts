import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet.html',
})

export class BottomSheetOverviewExampleSheet implements OnInit {
    resultadoEncriptacao(value: any, resultadoEncriptacao: any) {
        throw new Error("Method not implemented.");
    }

    private teste: string;
    f: any;
    snackBar: any;

    ngOnInit(): void {

    }

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute, ) {
        this._bottomSheetRef.afterDismissed().subscribe(() => {
        });
        if (typeof data.mensagem !== 'object' && data.mensagem !== null) {
            this.teste = data.mensagem.substring(3);
        }
        else {
            this.teste = 'Digital encontrada, efetuando login, por favor aguarde.';
            this.authenticationService.loginDigital(data.mensagem);
            if (this.route.snapshot.queryParamMap.get('returnUrl')) {
                this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl')]);
            } else {
                this.router.navigate(['home']);
            }
            _bottomSheetRef.dismiss();
        }
    }
}