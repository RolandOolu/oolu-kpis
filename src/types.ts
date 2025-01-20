export interface Membre {
  id: number;
  nom: string;
  poste: string;
  photo: string;
  equipe: string;
}

export type ObjectiveLevel = 'company' | 'department' | 'individual';

export interface Objectif {
  id: number;
  titre: string;
  description: string;
  dateEcheance: string;
  progression: number;
  responsable: number;
  statut: 'en_cours' | 'complete' | 'en_retard';
  level: ObjectiveLevel;
  parentId?: number; // Reference to parent objective
  equipe?: string; // For department level objectives
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