import CotisationsSociales from './CotisationsSociales';
import ImpotRevenu from './ImpotRevenu';
import ImpotSociete from './ImpotSociete';
import Dividendes from './Dividendes';

export default class EURL {

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
        res.is = 0;
        // Rémunération
        let cs = new CotisationsSociales(this.remuneration, this.accre);
        res.cotisationsRemu = cs.getCotisations();
        res.remunerationNet = this.remuneration - res.cotisationsRemu;
        res.baseIR += res.remunerationNet *0.9 ; // https://captaincontrat.com/guide/regime-fiscal-dirigeant/
        // ARE
        res.baseIR += this.are * 0.9;        
        // IS
        res.societe = this.ca - this.charges - this.remuneration - this.dividendes;
        let is = new ImpotSociete(res.societe);
        res.is = is.getImpot();
        // Dividendes
        let distribuable = 0;
        if (this.dividendes > 0) { 
            // http://gestiondepatrimoine.com/entreprise/les-points-cles/cotisations-sociales-dividendes-des-gerants-sarl-eurl.html
            var brut = this.dividendes - res.is;
            var cotisations = (brut*0.79) * 0.36;
            var csgCrds = (brut*0.79) * 0.08;
            var net = (brut*0.79) - cotisations-csgCrds;
            var abattement40 = net * 0.4;
            res.baseIR += net-abattement40;
            distribuable = net; 
        }
        res.dividendes = distribuable;
        // IR
        let ir = new ImpotRevenu(res.baseIR);
        res.IR = ir.getImpot();
        res.tranches = ir.getTranches();
        // Brut, net
        res.brut = this.ca - this.charges + this.are; //  = remu + are
        res.net = this.remuneration - res.cotisationsRemu + distribuable + this.are - res.IR;

        return res;
    }
}
    