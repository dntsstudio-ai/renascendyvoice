// ============================================================
//  config/config.js — Renascendi Voice
// ============================================================

export const FIREBASE_CONFIG = {
    apiKey:            "AIzaSyCdE_m9VjxC8Qpemep0B1rLf7kzu2np6QA",
    authDomain:        "renascendi-voice.firebaseapp.com",
    projectId:         "renascendi-voice",
    storageBucket:     "renascendi-voice.firebasestorage.app",
    messagingSenderId: "1007789934185",
    appId:             "1:1007789934185:web:94d495c8512270700084f8"
};

export const EMAILJS_CONFIG = {
    serviceId:       'service_sws',
    templateSuggest: 'template_suggest',
    publicKey:       'FExFPIAtSKcFcS2yy'
};

export const SOCIAL_LINKS = {
    vk:       'https://vk.ru/soundwavestudiosws',
    telegram: 'https://t.me/soundwavestudiosws',
    youtube:  'https://www.youtube.com/@SoundWaveDUB'
};

export const JOIN_FORM_URL        = 'https://forms.gle/YOUR_GOOGLE_FORM_ID';
export const PLACEHOLDER_IMG      = 'https://placehold.co/300x420/0a1a26/22c55e?text=RV';
export const PLACEHOLDER_TEAM_IMG = 'https://api.dicebear.com/7.x/identicon/svg';

// Просмотр засчитывается после N минут на странице релиза
export const VIEW_COUNT_AFTER_MS = 10 * 60 * 1000;

// Базовые ачивки — выдаются автоматически
export const AUTO_ACHIEVEMENTS = [
    { id: 'first_view',     name: 'Первый просмотр',    desc: 'Посмотрел первый релиз',           img: '👁️',  trigger: 'views_1'    },
    { id: 'views_10',       name: 'Киноман',             desc: '10 просмотренных релизов',          img: '🎬',  trigger: 'views_10'   },
    { id: 'views_50',       name: 'Синефил',             desc: '50 просмотренных релизов',          img: '🏆',  trigger: 'views_50'   },
    { id: 'first_comment',  name: 'Голос',               desc: 'Оставил первый комментарий',        img: '💬',  trigger: 'comment_1'  },
    { id: 'first_like',     name: 'Меценат',             desc: 'Поставил первый лайк',              img: '❤️',  trigger: 'like_1'     },
    { id: 'first_favorite', name: 'Коллекционер',        desc: 'Добавил релиз в избранное',         img: '⭐',  trigger: 'favorite_1' },
    { id: 'subs_1',         name: 'Популярный',          desc: 'Получил первого подписчика',        img: '🌟',  trigger: 'subs_1'     },
    { id: 'suggest_1',      name: 'Инициатор',           desc: 'Предложил проект для озвучки',      img: '💡',  trigger: 'suggest_1'  },
    { id: 'profile_filled', name: 'Личность',            desc: 'Заполнил профиль полностью',        img: '🎭',  trigger: 'profile_ok' },
    { id: 'newcomer',       name: 'Новичок',             desc: 'Зарегистрировался на сайте',        img: '👋',  trigger: null         },
];
