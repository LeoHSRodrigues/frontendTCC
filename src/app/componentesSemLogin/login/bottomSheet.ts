import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet.html',
})

export class BottomSheetOverviewExampleSheet implements OnInit {


    ngOnInit(): void {

    }


    private teste: string;

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {

        this._bottomSheetRef.afterDismissed().subscribe(() => {
        });
    }
}