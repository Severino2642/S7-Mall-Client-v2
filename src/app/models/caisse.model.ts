export interface CaisseModel {
    _id?: string;
    idProprietaire?: string;
    nom?: string;
    numero_compte?: string;
    total_debit?: number;
    total_credit?: number;
    solde?: number;
    status?: number;
    date?: Date;
}
