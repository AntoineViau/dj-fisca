/// <reference path="node.d.ts" />

import {ARE, ACCRE, CA, FRAIS} from './inputs';
import Outputer from './Outputer';
import EURL from './eurl';
var nbJours = 160;
var tj = 500;
var ca = nbJours * tj;
var frais = FRAIS;
//frais.push({ label: 'loyers', montant: 1500 * 0.2 * 12 });
var charges = frais.reduce((sum, cur) => sum + (cur.immo ? cur.montant * cur.immo : cur.montant), 0);
var dividendes = 0;
var accre = 21116;
var are = 10 * 900;
var remuneration = ca - charges - dividendes - 2500;

var eurl = (new EURL(ca, charges, remuneration, dividendes, accre, are)).exercice();

let o: Outputer = new Outputer();
o.w('Nb jours : ' + nbJours+' ('+Math.ceil(nbJours/20)+' mois)');
o.w('TJ : ' + o.e(tj));
o.w('CA : ' + o.e(ca));
o.w('Charges : ' + o.e(charges));
o.w('Rémunération : ' + o.e(remuneration));
o.w('Dividendes : ' + o.e(dividendes));
o.w('Société : ' + o.e(ca - charges - remuneration - dividendes));
o.w('ACCRE : ' + o.e(accre));
o.w('ARE : ' + o.e(are));
o.w('');
o.w('Cotisations sociales rémunération : ' + o.e(eurl.cotisationsRemu));
o.w('IS : ' + o.e(eurl.is));
o.w('base IR : ' + o.e(eurl.baseIR));
o.w('IR : ' + o.e(eurl.IR));
eurl.tranches.forEach((tranche, idx) => o.w(
    ' - Tranche ' + idx +
    ' (' + tranche.min + ' - ' + tranche.max + ', ' + o.pc(tranche.taux) + ') : ' + o.e(tranche.value)));
o.w('Brut : ' + o.e(eurl.brut));
o.w('Net : ' + o.e(eurl.net));
o.w('Net société : ' + o.e(eurl.societe - eurl.is));
o.w('Mensuel : ' + o.e(eurl.net / 12));
o.w('TJ net : ' + o.e(eurl.net / nbJours));
o.w('Pourcentage de prélèvements : ' + o.pc((eurl.brut - eurl.net) / eurl.brut));

