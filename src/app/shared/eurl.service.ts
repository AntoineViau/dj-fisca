import { Injectable } from '@angular/core';
import EURL from './EURL';
import { IEntreprise } from './IEntreprise.interface';

@Injectable()
export class EurlService implements IEntreprise {

    private eurl: EURL;

    constructor() { }

    compute(ca: number,
        charges: number,
        remuneration: number,
        dividendes: number,
        accre: number = 0,
        are: number = 0) {
        return  (new EURL(ca, charges, remuneration, dividendes, accre, are)).exercice();
    }
}
