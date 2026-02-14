export class UtilitaireUtil {
  static dateToDMY_HM (date: Date | undefined): string {
    if (!date) return 'JJ/MM/AAAA HH:MM';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  static formatAmount(amount: number| undefined): string {
    if (!amount) return '0.00';
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Comparer uniquement la DATE (sans l'heure)
  static compareDatesOnly(d1: Date, d2: Date): boolean {
    return d1.toDateString() === d2.toDateString();
  }

  // Vérifier si même jour
  static isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  // Différence en jours
  static daysBetween(d1: Date, d2: Date): number {
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Vérifier si date est dans l'intervalle
  static isBetween(date: Date, start: Date, end: Date): boolean {
    return date.getTime() >= start.getTime() &&
      date.getTime() <= end.getTime();
  }
}
