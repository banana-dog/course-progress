const CONFIG = {
  levels: [
    { level: 1, name: "Новичок", xpRequired: 0 },
    { level: 2, name: "Ученик", xpRequired: 100 },
    { level: 3, name: "Исследователь", xpRequired: 250 },
    { level: 4, name: "Создатель", xpRequired: 500 },
    { level: 5, name: "Мастер", xpRequired: 800 },
    { level: 6, name: "Эксперт", xpRequired: 1200 },
    { level: 7, name: "Гуру", xpRequired: 1700 },
    { level: 8, name: "Легенда", xpRequired: 2300 }
  ],
  
  lessonBadges: [
    { lesson: 1, badge: "🎯", name: "Первый шаг", desc: "Создал первую открытку" },
    { lesson: 2, badge: "📝", name: "Мастер промптов", desc: "Написал отличный промпт" },
    { lesson: 3, badge: "🏗️", name: "Архитектор", desc: "Создал страницу HTML" },
    { lesson: 4, badge: "🎨", name: "Художник", desc: "Стилизовал проект" },
    { lesson: 5, badge: "⚡", name: "Программист", desc: "Создал интерактив" },
    { lesson: 6, badge: "🎮", name: "Геймдизайнер", desc: "Создал первую игру" },
    { lesson: 7, badge: "💰", name: "Бизнесмен", desc: "Создал кликер" },
    { lesson: 8, badge: "🎭", name: "Творец", desc: "Создал генератор" },
    { lesson: 9, badge: "🏆", name: "Лидер", desc: "Завершил итоговый проект" },
    { lesson: 10, badge: "🏆", name: "Лидер", desc: "Завершил итоговый проект" }
  ],
  
  specialBadges: [
    { id: "🔧", name: "Отладчик", desc: "Исправил 3 ошибки сам" },
    { id: "💡", name: "Изобретатель", desc: "Придумал уникальную функцию" },
    { id: "🚀", name: "Экспериментатор", desc: "Попробовал 5 разных промптов" },
    { id: "📚", name: "Эрудит", desc: "Ответил на все вопросы викторины" },
    { id: "🌟", name: "Суперзвезда", desc: "Получил все бейджи" }
  ]
};

function getLevel(xp) {
  for (let i = CONFIG.levels.length - 1; i >= 0; i--) {
    if (xp >= CONFIG.levels[i].xpRequired) {
      return CONFIG.levels[i];
    }
  }
  return CONFIG.levels[0];
}

function getNextLevel(currentLevel) {
  const idx = CONFIG.levels.findIndex(l => l.level === currentLevel.level);
  return CONFIG.levels[idx + 1] || null;
}

function getXpToNextLevel(xp) {
  const current = getLevel(xp);
  const next = getNextLevel(current);
  if (!next) return 0;
  return next.xpRequired - xp;
}

function getProgressPercent(xp) {
  const current = getLevel(xp);
  const next = getNextLevel(current);
  if (!next) return 100;
  const currentRequired = current.xpRequired;
  const nextRequired = next.xpRequired;
  const progress = ((xp - currentRequired) / (nextRequired - currentRequired)) * 100;
  return Math.min(100, Math.max(0, progress));
}
