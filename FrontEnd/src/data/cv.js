export const profile = {
  name: 'Andy Douangpanya',
  initials: 'AD',
  location: 'Montréal, QC',
  phone: '438-523-5926',
  email: 'andydouang@gmail.com',
  website: 'eyesightcollectibles.com',
}

export const content = {
  fr: {
    title:
      "Étudiant en Techniques de l'informatique — Développeur web & gestion de contenu",
    labels: {
      summary: 'Résumé',
      skills: 'Compétences',
      experience: 'Expérience',
      education: 'Formation',
      languages: 'Langues',
      contactInfo: 'Coordonnées',
      contact: 'Me contacter',
      print: 'Imprimer / PDF',
      name: 'Nom',
      email: 'Courriel',
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi…',
      sent: 'Message envoyé, merci !',
      error: 'Une erreur est survenue, réessayez plus tard.',
    },
    summary:
      "Étudiant en 4e session en Techniques de l'informatique au Collège de Maisonneuve, avec plus de 2 ans d'expérience concrète en développement web, e-commerce et marketing numérique acquise en gérant le site web et les réseaux sociaux d'un commerce en ligne. À la recherche d'un stage ou d'un emploi en TI où appliquer mes compétences techniques et mon autonomie dans un environnement dynamique.",
    skills: [
      {
        category: 'Développement web',
        items: ['WordPress', 'HTML', 'CSS', 'Gestion de thèmes et plugins'],
      },
      {
        category: 'Programmation',
        items: ['JavaScript', 'React'], // TODO: compléter (Python, SQL, Java, etc.)
      },
      {
        category: 'E-commerce & contenu',
        items: ['Gestion de catalogue', 'SEO', 'Design UI/UX'],
      },
      {
        category: 'Marketing numérique',
        items: ['Réseaux sociaux', 'Campagnes publicitaires en ligne'],
      },
      {
        category: 'Autres',
        items: [
          "Travail d'équipe",
          'Gestion des priorités',
          'Autonomie',
          'Résolution de problèmes',
        ],
      },
    ],
    experience: [
      {
        company: 'Eyesight Collectibles',
        role: 'Gestionnaire web & réseaux sociaux',
        period: '04/2024 – Présent',
        location: 'eyesightcollectibles.com',
        bullets: [
          'Développe et maintiens un site e-commerce WordPress (thèmes, plugins, mises à jour, sécurité)',
          'Gère un catalogue de produits diversifié : ajout, descriptions optimisées SEO, catégorisation et inventaire',
          "Conçois l'interface (UI) et optimise l'expérience utilisateur pour améliorer le taux de conversion",
          'Planifie et exécute les campagnes sur les réseaux sociaux pour stimuler la croissance et les ventes',
        ],
      },
      {
        company: 'La Banquise',
        role: 'Serveur',
        period: '07/2023 – Présent',
        location: 'Montréal',
        bullets: [
          'Assure un service rapide et précis dans un restaurant à fort achalandage',
          'Gère les demandes spéciales et restrictions alimentaires des clients',
          "Collabore en équipe pour maintenir l'efficacité sous pression",
        ],
      },
      {
        company: 'BIBIKO',
        role: 'Cuisinier',
        period: '07/2022 – 01/2023',
        location: 'Montréal',
        bullets: [
          'Préparais les plats selon les normes de sécurité alimentaire',
          "Optimisais l'organisation de la cuisine pour accélérer le service",
        ],
      },
      {
        company: '555e Escadron Maple Leaf',
        role: 'Rôle de leadership',
        period: '11/2018 – 10/2020',
        location: 'Montréal',
        bullets: [
          "Coordonnais les activités d'équipe et motivais les membres vers des objectifs communs",
          'Développais des compétences en communication et en résolution de problèmes',
        ],
      },
    ],
    education: [
      {
        school: 'Collège de Maisonneuve',
        location: 'Montréal',
        program: "DEC, Techniques de l'informatique",
        period: '2023 – Présent (5e session en cours)',
      },
    ],
    languages: [
      { name: 'Français', level: 'Natif' },
      { name: 'Anglais', level: 'Fonctionnel' },
    ],
  },

  en: {
    title:
      'Computer Science Technology Student — Web Developer & Content Manager',
    labels: {
      summary: 'Summary',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      languages: 'Languages',
      contactInfo: 'Contact',
      contact: 'Contact me',
      print: 'Print / PDF',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      sending: 'Sending…',
      sent: 'Message sent, thank you!',
      error: 'Something went wrong, please try again later.',
    },
    summary:
      "Fourth-semester Computer Science Technology student at Collège de Maisonneuve, with over 2 years of hands-on experience in web development, e-commerce, and digital marketing gained from managing the website and social media for an online business. Looking for an internship or entry-level IT role where I can apply my technical skills and autonomy in a dynamic environment.",
    skills: [
      {
        category: 'Web Development',
        items: ['WordPress', 'HTML', 'CSS', 'Theme & plugin management'],
      },
      {
        category: 'Programming',
        items: ['JavaScript', 'React'], // TODO: add other technologies (Python, SQL, Java, etc.)
      },
      {
        category: 'E-commerce & Content',
        items: ['Catalog management', 'SEO', 'UI/UX design'],
      },
      {
        category: 'Digital Marketing',
        items: ['Social media', 'Online ad campaigns'],
      },
      {
        category: 'Other',
        items: [
          'Teamwork',
          'Priority management',
          'Autonomy',
          'Problem solving',
        ],
      },
    ],
    experience: [
      {
        company: 'Eyesight Collectibles',
        role: 'Web & Social Media Manager',
        period: '04/2024 – Present',
        location: 'eyesightcollectibles.com',
        bullets: [
          'Build and maintain a WordPress e-commerce site (themes, plugins, updates, security)',
          'Manage a diverse product catalog: listings, SEO-optimized descriptions, categorization and inventory',
          'Design the UI and optimize the user experience to improve conversion rate',
          'Plan and run social media campaigns to drive growth and sales',
        ],
      },
      {
        company: 'La Banquise',
        role: 'Server',
        period: '07/2023 – Present',
        location: 'Montreal',
        bullets: [
          'Provide fast, accurate service in a high-traffic restaurant',
          'Handle special requests and dietary restrictions',
          'Work as part of a team to stay efficient under pressure',
        ],
      },
      {
        company: 'BIBIKO',
        role: 'Cook',
        period: '07/2022 – 01/2023',
        location: 'Montreal',
        bullets: [
          'Prepared dishes according to food safety standards',
          'Optimized kitchen organization to speed up service',
        ],
      },
      {
        company: '555th Maple Leaf Squadron',
        role: 'Leadership role',
        period: '11/2018 – 10/2020',
        location: 'Montreal',
        bullets: [
          'Coordinated team activities and motivated members toward shared goals',
          'Developed communication and problem-solving skills',
        ],
      },
    ],
    education: [
      {
        school: 'Collège de Maisonneuve',
        location: 'Montreal',
        program: 'DEC, Computer Science Technology',
        period: '2023 – Present (5th semester in progress)',
      },
    ],
    languages: [
      { name: 'French', level: 'Native' },
      { name: 'English', level: 'Working proficiency' },
    ],
  },
}
