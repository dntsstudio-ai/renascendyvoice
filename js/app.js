// ============================================================
//  js/app.js — Renascendi Voice. Все баги исправлены.
// ============================================================

import { initializeApp }               from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc }   from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { FIREBASE_CONFIG, EMAILJS_CONFIG } from '../config/config.js';
import { navigate, closeModals, showToast } from './core.js';
import { initAuthListeners, applyUserUI, resetUserUI, bindAuthActions } from './auth.js';
import { renderAchProfile, bindAchievements } from './achievements.js';
import { loadReleases, bindReleases, enableSearch, disableSearch } from './releases.js';
import { bindComments }  from './comments.js';
import { bindTeam }      from './team.js';
import { bindUsers }     from './users.js';
import { initDubinPanel, bindDubin } from './dubin.js';
import { bindOrder }     from './order.js';
import { bindPlaylists } from './playlists.js';

// ── Firebase ──
const app  = initializeApp(FIREBASE_CONFIG);
const db   = getFirestore(app);
const auth = getAuth(app);

if (window.emailjs) emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

// ── Глобальное состояние ──
const state = {
    userData: null,
    isAdmin:  false,
    isDub:    false,
    isMod:    false,
    curProj:  null
};
const getState = () => state;

// ── Регистрируем все обработчики ──
bindReleases(db, auth, getState);   // регистрирует window.openView и остальное
bindComments(db, auth, getState);
bindTeam(db, getState);
bindUsers(db, auth, getState);
bindAchievements(db, auth, getState);
bindDubin(db, auth, getState);
bindAuthActions(auth, db, getState);
bindOrder(db, auth, getState);
bindPlaylists(db, auth, getState);  // регистрирует window.loadPlaylistsPage и остальное

// ── Глобальные утилиты ──
window.closeModals = closeModals;
window.showToast   = showToast;
window._releasesEnableSearch  = enableSearch;
window._releasesDisableSearch = disableSearch;

// ── Навигация ──
window.navigate = (page, pushState = true) => {
    navigate(page, pushState);

    if (page === 'team')  window.loadTeam?.();

    if (page === 'dubin') {
        initDubinPanel(state.isAdmin, state.isDub);
        if (state.isDub) window.renderDubinProjects?.();
    }

    if (page === 'profile' && state.userData) {
        window.loadMyLists?.();
    }

    if (page === 'playlists') {
        if (!state.userData) {
            navigate('profile', pushState);
            return;
        }
        // loadPlaylistsPage регистрируется в bindPlaylists → playlists.js
        window.loadPlaylistsPage?.();
    }
};

// ── Auth: следим за состоянием входа ──
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) {
                state.userData = snap.data();
                state.isAdmin  = state.userData.role === 'admin';
                state.isDub    = state.userData.role === 'dub' || state.isAdmin;
                state.isMod    = state.userData.role === 'moderator';
                applyUserUI(state.userData, state.isAdmin, state.isDub);
                renderAchProfile(state.userData);
            } else {
                resetUserUI();
            }
        } catch(e) {
            console.error('Профиль:', e);
            resetUserUI();
        }
    } else {
        state.userData = null;
        state.isAdmin  = false;
        state.isDub    = false;
        state.isMod    = false;
        resetUserUI();
    }

    await loadReleases(db, state.isAdmin);
    initAuthListeners(auth, db);

    const hashPage = window.location.hash.replace('#', '') || 'home';
    if (hashPage === 'dubin' && !state.isDub) {
        window.navigate('home', false);
    } else {
        window.navigate(hashPage, false);
    }
});

window.addEventListener('popstate', () => {
    const page = window.location.hash.replace('#', '') || 'home';
    window.navigate(page, false);
});
