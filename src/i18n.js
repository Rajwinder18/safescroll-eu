export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
];

const messages = {
  en: {
    overview: 'Overview',
    search: 'Search topics, laws, quiz...',
    dashboardTitle: 'How Europe is Protecting Under-15s Online',
    adjustRoutine: 'Adjust my routine'
  },
  fr: {
    overview: 'Vue d’ensemble',
    search: 'Rechercher des sujets, lois, quiz...',
    dashboardTitle: 'Comment l’Europe protège les moins de 15 ans en ligne',
    adjustRoutine: 'Ajuster ma routine'
  },
  es: {
    overview: 'Resumen',
    search: 'Buscar temas, leyes, cuestionario...',
    dashboardTitle: 'Cómo Europa protege a los menores de 15 años en línea',
    adjustRoutine: 'Ajustar mi rutina'
  }
};

export function translate(language, key) {
  return messages[language]?.[key] || messages.en[key] || key;
}
