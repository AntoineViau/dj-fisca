export default class CotisationsSociales {

    constructor(
        private remuneration: number = 0,
        private accre: number = 0,
        private PASS: number = 38616) {
    }

    _revenuPro() {
        return this.remuneration;
    }

    getMaladie(): number {
        var assiette = this._revenuPro() < this.accre ? 0 : this._revenuPro() - this.accre;
        return assiette * 0.065;
    }

    getAllocationsFamiliales() {
        var assiette = this._revenuPro() < this.accre ? 0 : this._revenuPro() - this.accre;
        var taux: number;
        if (assiette < this.PASS * 1.1) {
            taux = 0.0215;
        }
        if (assiette > this.PASS * 1.1 && assiette < this.PASS * 1.4) {
            let diffPASS = this.PASS * 1.4 - this.PASS * 1.1;
            let diffRp = assiette - this.PASS * 1.1;
            let pourcentage = diffRp / diffPASS;
            let diffPourcent = 0.0525 - 0.0215;
            taux = 0.0215 + diffPourcent * pourcentage;
        }
        if (assiette > this.PASS * 1.4) {
            taux = 0.0525;
        }
        return assiette * taux;
    }

    getFormationProfessionnelle(): number {
        return this.PASS * 0.0025;
    }

    getRetraiteBase(): number {
        var assiette = this._revenuPro() < this.accre ? 0 : this._revenuPro() - this.accre;
        return assiette > this.PASS ? this.PASS * 0.0823 + (assiette - this.PASS) * 0.0187 : assiette * 0.0823;
    }

    getRetraiteComplementaire(): number {
        // http://service.cipav-retraite.fr/cipav/article-16-pour-les-beneficiaires-de-laccre-100.htm
        if (this.accre) {
            return 0;
        }
        var assiette = this._revenuPro();
        var montant;
        if (assiette <= 26580) {
            montant = 1214;
        }
        if (assiette > 26580 && assiette <= 49280) {
            montant = 2427;
        }
        if (assiette > 49280 && assiette <= 57850) {
            montant = 3641;
        }
        if (assiette > 57850 && assiette <= 66400) {
            montant = 6068;
        }
        if (assiette > 66400 && assiette <= 83060) {
            montant = 8495;
        }
        if (assiette > 83060 && assiette <= 103180) {
            montant = 13349;
        }
        if (assiette > 103180 && assiette <= 123300) {
            montant = 14563;
        }
        if (assiette > 123300) {
            montant = 15776;
        }
        return montant;
    }

    getInvaliditeDeces(classe = 'C'): number {
        // http://service.cipav-retraite.fr/cipav/article-16-pour-les-beneficiaires-de-laccre-100.htm
        if (this.accre) {
            return 0;
        }
        return 380;
    }

    getCsgCrds(): number {
        var cotisationsObligatoires = this.getMaladie();
        return (this._revenuPro() + cotisationsObligatoires) * 0.08;
    }

    getCotisations(): number {
        var total = 0;
        total += this.getMaladie();
        total += this.getAllocationsFamiliales();
        total += this.getFormationProfessionnelle();
        total += this.getRetraiteBase();
        total += this.getRetraiteComplementaire();
        total += this.getInvaliditeDeces();
        total += this.getCsgCrds();
        return total;
    }
}

