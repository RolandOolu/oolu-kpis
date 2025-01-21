export interface Membre {
  id: string;
  nom: string;
  poste: string;
  photo: string;
  equipe: string;
  email: string;
  phone?: string;
  uid?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  uid: string;
  email: string;
  role?: 'admin' | 'member' | 'moderator';
  status?: 'active' | 'inactive' | 'suspended';
  membre?: Membre | null;
  createdAt?: string;
  updatedAt?: string;
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

export type ObjectiveLevel = 'company' | 'department' | 'individual';
export type ObjectiveStatus = 'en_cours' | 'complete' | 'en_retard';

export interface KeyResult {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
  dueDate: string;
}

export interface Objectif {
  id: string;
  titre: string;
  description: string;
  dateEcheance: string;
  progression: number;
  responsable: string;
  statut: ObjectiveStatus;
  level: ObjectiveLevel;
  parentId?: string;
  departmentId?: string;
  keyResults: KeyResult[];
  createdAt: string;
  updatedAt: string;
  children?: Objectif[];
}

export interface AuthUser {
  uid: string;
  email: string;
  role?: 'admin' | 'member' | 'moderator';
  membre?: Membre | null;
}