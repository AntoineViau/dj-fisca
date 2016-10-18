/// <reference path="node.d.ts" />

import {ARE, ACCRE, CA, FRAIS} from './inputs';
import Outputer from './Outputer';
import ImpotRevenu from './ImpotRevenu';

var ca = 9500 + 10500 + 10500 + 10500 + 9500 + 6500 + 5300 + 11130 + 11660 + 7950 + 19600;

let o: Outputer = new Outputer();
o.w('CA : ' + o.e(ca));

let cs = ca * 0.253;
o.w('Cotisations sociales rémunération : ' + o.e(cs));

let baseIR = (ca - cs) * 0.66;
let ir = new ImpotRevenu(baseIR);
o.w('base IR : ' + o.e(baseIR));
o.w('IR : ' + o.e(ir.getImpot()));
ir.getTranches().forEach((tranche, idx) => o.w(
    ' - Tranche ' + idx +
    ' (' + tranche.min + ' - ' + tranche.max + ', ' + o.pc(tranche.taux) + ') : ' + o.e(tranche.value)));
let brut = ca;
let net = ca - cs - ir.getImpot();
o.w('Brut : ' + o.e(brut));
o.w('Net : ' + o.e(net));
o.w('Mensuel : ' + o.e(net / 12));
o.w('Pourcentage de prélèvements : ' + o.pc((brut - net) / brut));

