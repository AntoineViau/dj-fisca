import ImpotRevenu from './ImpotRevenu';
import ImpotSociete from './ImpotSociete';
import {ARE, ACCRE, CA, FRAIS} from './inputs';
import Outputer from './Outputer';

// http://www.sas-sasu.info/les-cotisations-sociales-dun-president-de-sas-ou-de-sasu/
function paie (remuneration: number, PASS = 38616) {
    let cotisations: any = {};
    let base;
    // CSG/CRDS non déductible
    base = remuneration * 0.985;
    cotisations.csgCrdsNonDeductible = base * 0.0290;
    // CSG déductible
    cotisations.csgDeductible = base * 0.0510;
    // Maladie
    cotisations.maladie = remuneration * (0.0075 + 0.1284);
    // Contribution solidarité autonomie
    cotisations.solidarite = remuneration * 0.0030;
    // Retraite plafonnée
    base = remuneration > PASS ? PASS : remuneration;
    cotisations.retraitePlafonnee = base * (0.0690 + 0.0855);
    // Retraite déplafonnée
    cotisations.retraiteDeplafonnee = remuneration * (0.0035 + 0.0185);
    // Allocations familiales
    cotisations.allocationsFamiliales = remuneration * 0.0525;
    // Aide au logement
    base = remuneration > PASS ? PASS : remuneration;
    cotisations.aideAuLogement = base * 0.0010;
    // Accident travail
    //cotisations.accidentTravail = ??? dépend de l'activité
    // Retraite complémentaire non cadre

    cotisations.total = Object.keys(cotisations).reduce((sum, cur) => sum + cotisations[cur], 0);

    return cotisations;
}


class SASU {
    constructor(
        private ca: number,
        private charges: number,
        private remuneration: number,
        private dividendes: number,
        private accre: number = 0,
        private are: number = 0) { }

    exercice() {
        let res: any = {};
        res.baseIR = 0;
        // Dividendes
        let distribuable = 0;
        if (this.dividendes > 0) {
            distribuable = this.dividendes;
            let beneficeBrut = this.ca - this.charges - this.remuneration;            
            res.baseIR += beneficeBrut * 0.6;
            let is = new ImpotSociete(beneficeBrut);
            let cotisations = beneficeBrut * 0.155; 
            distribuable -= is.getImpot() + cotisations;
            
        }
        // Rémunération (salaires)
        // L'ACCRE s'applique sur maladie-maternite-veuvage
        let remuNet = this.remuneration / 1.35;
        res.baseIR += remuNet * 0.9;
        // ARE
        res.baseIR += this.are * 0.9;
        // IR
        let ir = new ImpotRevenu(res.baseIR);
        res.IR = ir.getImpot();
        res.tranches = ir.getTranches();
        // Brut, net
        res.brut = this.are + this.remuneration + this.dividendes;
        res.net = this.are + distribuable + remuNet - ir.getImpot();

        return res;
    }
}

let cotisations = paie(1000);
Object.keys(cotisations).forEach((c) => console.log(c+' : '+cotisations[c]));

var ca = CA;
var frais = FRAIS;
var charges = frais.reduce((sum, cur) => sum + cur.montant, 0);
var dividendes = CA - ACCRE;
var accre = ACCRE;
var are = ARE;
var remuneration = ca - charges - dividendes;

var sasu = (new SASU(ca, charges, remuneration, dividendes, accre, are)).exercice();

let o: Outputer = new Outputer();
o.w('CA : ' + o.e(ca));
o.w('Charges : ' + o.e(charges));
o.w('Dividendes : ' + o.e(dividendes));
o.w('Rémunération : ' + o.e(remuneration));
o.w('ACCRE : ' + o.e(accre));
o.w('');
o.w('IR : ' + o.e(sasu.IR));
sasu.tranches.forEach((tranche, idx) => o.w(' - Tranche ' + idx + ' : ' + o.e(tranche)));
o.w('Brut : ' + o.e(sasu.brut));
o.w('Net : ' + o.e(sasu.net));
o.w('Mensuel : ' + o.e(sasu.net / 12));
o.w('Pourcentage de prélèvements : ' + o.pc((sasu.brut - sasu.net) / sasu.brut));



