export interface Membre {
  id: number;
  nom: string;
  poste: string;
  photo: string;
  equipe: string;
}

export interface Objectif {
  id: number;
  titre: string;
  description: string;
  dateEcheance: string;
  progression: number;
  responsable: number;
  statut: 'en_cours' | 'complete' | 'en_retard';
}

export interface KPI {
  id: number;
  nom: string;
  valeur: number;
  cible: number;
  unite: string;
  tendance: 'hausse' | 'baisse' | 'stable';
  categorie: string;
}