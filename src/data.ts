import { Membre, Objectif, KPI, KeyResult } from './types';

export const membres: Membre[] = [
  {
    id: 1,
    nom: 'Oluwaseun Adebayo',
    poste: 'Directeur Général',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Direction',
    email: 'oluwaseun.adebayo@oolu.energy'
  },
  {
    id: 2,
    nom: 'Chioma Okonkwo',
    poste: 'Directrice Marketing',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Marketing',
    email: 'chioma.okonkwo@oolu.energy'
  },
  {
    id: 3,
    nom: 'Babajide Ogunleye',
    poste: 'Chef de Projet',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Développement',
    email: 'babajide.ogunleye@oolu.energy'
  },
  {
    id: 4,
    nom: 'Aisha Mohammed',
    poste: 'Responsable RH',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Ressources Humaines',
    email: 'aisha.mohammed@oolu.energy'
  },
  {
    id: 5,
    nom: 'Emmanuel Nwachukwu',
    poste: 'Lead Developer',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Développement',
    email: 'emmanuel.nwachukwu@oolu.energy'
  },
  {
    id: 6,
    nom: 'Folake Adeleke',
    poste: 'Designer UI/UX',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Design',
    email: 'folake.adeleke@oolu.energy'
  },
  {
    id: 7,
    nom: 'Taiwo Olayinka',
    poste: 'Analyste Financier',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Finance',
    email: 'taiwo.olayinka@oolu.energy'
  },
  {
    id: 8,
    nom: 'Ngozi Eze',
    poste: 'Responsable Commercial',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Commercial',
    email: 'ngozi.eze@oolu.energy'
  },
  {
    id: 9,
    nom: 'Yusuf Ibrahim',
    poste: 'Développeur Backend',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Développement',
    email: 'yusuf.ibrahim@oolu.energy'
  },
  {
    id: 10,
    nom: 'Blessing Okafor',
    poste: 'Content Manager',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Marketing',
    email: 'blessing.okafor@oolu.energy'
  },
  {
    id: 11,
    nom: 'Olayinka Adeniyi',
    poste: 'Data Analyst',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Data',
    email: 'olayinka.adeniyi@oolu.energy'
  },
  {
    id: 12,
    nom: 'Chidi Aneke',
    poste: 'DevOps Engineer',
    photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
    equipe: 'Développement',
    email: 'chidi.aneke@oolu.energy'
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
    statut: 'en_cours',
    level: 'company',
    keyResults: [
      {
        id: 1,
        title: 'Nouveaux partenariats tech',
        target: 20,
        current: 12,
        unit: 'partenaires',
        dueDate: '2024-06-30'
      },
      {
        id: 2,
        title: 'Surface de bureaux',
        target: 5000,
        current: 3200,
        unit: 'm²',
        dueDate: '2024-05-15'
      }
    ]
  },
  {
    id: 2,
    titre: 'Programme Formation Tech',
    description: 'Former 500 jeunes développeurs nigérians',
    dateEcheance: '2024-03-31',
    progression: 85,
    responsable: 3,
    statut: 'en_cours',
    level: 'department',
    parentId: 1,
    departmentId: 'DEV',
    keyResults: [
      {
        id: 3,
        title: 'Développeurs formés',
        target: 500,
        current: 425,
        unit: 'personnes',
        dueDate: '2024-03-31'
      }
    ]
  },
  {
    id: 3,
    titre: 'Digitalisation PME',
    description: 'Accompagner 100 PME dans leur transformation digitale',
    dateEcheance: '2024-04-15',
    progression: 100,
    responsable: 2,
    statut: 'complete',
    level: 'department',
    departmentId: 'MKT',
    keyResults: [
      {
        id: 4,
        title: 'PME accompagnées',
        target: 100,
        current: 100,
        unit: 'entreprises',
        dueDate: '2024-04-15'
      }
    ]
  },
  {
    id: 4,
    titre: 'Innovation FinTech',
    description: 'Lancer notre solution de paiement mobile',
    dateEcheance: '2024-08-30',
    progression: 40,
    responsable: 7,
    statut: 'en_cours',
    level: 'individual',
    parentId: 2,
    keyResults: [
      {
        id: 5,
        title: 'Transactions test',
        target: 10000,
        current: 3500,
        unit: 'transactions',
        dueDate: '2024-08-15'
      }
    ]
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