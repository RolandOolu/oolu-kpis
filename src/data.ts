import { Membre, Objectif, KPI } from './types';

export const membres: Membre[] = [
  {
    id: 1,
    nom: 'Oluwaseun Adebayo',
    poste: 'Directeur Général',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    equipe: 'Direction'
  },
  {
    id: 2,
    nom: 'Chioma Okonkwo',
    poste: 'Directrice Marketing',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    equipe: 'Marketing'
  },
  {
    id: 3,
    nom: 'Babajide Ogunleye',
    poste: 'Chef de Projet',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    equipe: 'Développement'
  },
  {
    id: 4,
    nom: 'Aisha Mohammed',
    poste: 'Responsable RH',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    equipe: 'Ressources Humaines'
  },
  {
    id: 5,
    nom: 'Emmanuel Nwachukwu',
    poste: 'Lead Developer',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
    equipe: 'Développement'
  },
  {
    id: 6,
    nom: 'Folake Adeleke',
    poste: 'Designer UI/UX',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    equipe: 'Design'
  },
  {
    id: 7,
    nom: 'Taiwo Olayinka',
    poste: 'Analyste Financier',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    equipe: 'Finance'
  },
  {
    id: 8,
    nom: 'Ngozi Eze',
    poste: 'Responsable Commercial',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    equipe: 'Commercial'
  },
  {
    id: 9,
    nom: 'Yusuf Ibrahim',
    poste: 'Développeur Backend',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    equipe: 'Développement'
  },
  {
    id: 10,
    nom: 'Blessing Okafor',
    poste: 'Content Manager',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    equipe: 'Marketing'
  },
  {
    id: 11,
    nom: 'Olayinka Adeniyi',
    poste: 'Data Analyst',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    equipe: 'Data'
  },
  {
    id: 12,
    nom: 'Chidi Aneke',
    poste: 'DevOps Engineer',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
    equipe: 'Développement'
  }
];

export const objectifs: Objectif[] = [
  {
    id: 1,
    titre: 'Expansion Lagos Tech Hub',
    description: 'Développer notre présence dans le hub technologique de Lagos',
    dateEcheance: '2024-06-30',
    progression: 65,
    responsable: 1,
    statut: 'en_cours'
  },
  {
    id: 2,
    titre: 'Programme Formation Tech',
    description: 'Former 500 jeunes développeurs nigérians',
    dateEcheance: '2024-03-31',
    progression: 85,
    responsable: 3,
    statut: 'en_cours'
  },
  {
    id: 3,
    titre: 'Digitalisation PME',
    description: 'Accompagner 100 PME dans leur transformation digitale',
    dateEcheance: '2024-04-15',
    progression: 100,
    responsable: 2,
    statut: 'complete'
  },
  {
    id: 4,
    titre: 'Innovation FinTech',
    description: 'Lancer notre solution de paiement mobile',
    dateEcheance: '2024-08-30',
    progression: 40,
    responsable: 7,
    statut: 'en_cours'
  }
];

export const kpis: KPI[] = [
  {
    id: 1,
    nom: 'Chiffre d\'affaires',
    valeur: 850000000,
    cible: 1000000000,
    unite: '₦',
    tendance: 'hausse',
    categorie: 'Finance'
  },
  {
    id: 2,
    nom: 'Satisfaction Client',
    valeur: 4.2,
    cible: 4.5,
    unite: '/5',
    tendance: 'stable',
    categorie: 'Client'
  },
  {
    id: 3,
    nom: 'Nouveaux Clients',
    valeur: 285,
    cible: 300,
    unite: '',
    tendance: 'hausse',
    categorie: 'Croissance'
  },
  {
    id: 4,
    nom: 'Projets Digitaux',
    valeur: 45,
    cible: 50,
    unite: '',
    tendance: 'hausse',
    categorie: 'Performance'
  }
];