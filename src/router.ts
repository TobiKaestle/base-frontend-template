import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';
import { useMainStore } from './stores/MainStore';
import { useSessionStore } from './stores/SessionStore';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'HomeView',
        component: () => import('./views/HomeView.vue'),
        meta: { title: 'navigation.home.title', visible: true },
    },
    {
        path: '/examples',
        name: 'ExamplesView',
        component: () => import('./views/PageView.vue'),
        meta: {
            title: 'navigation.example.title',
            visible: true,
        },
        children: [
            {
                path: '/examples',
                redirect: '/examples/backend',
                meta: { visible: false },
            },
            {
                path: '/examples/backend',
                name: 'ExamplesListView',
                component: () => import('./views/example/TableBackendView.vue'),
                meta: {
                    title: 'navigation.example.children.backend',
                    visible: true,
                },
            },
            {
                path: '/examples/frontend',
                name: 'TableAsyncView',
                component: () => import('./views/example/TableFrontendView.vue'),
                meta: {
                    title: 'navigation.example.children.frontend',
                    visible: true,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'LoginView',
        component: () => import('./views/session/LoginView.vue'),
        meta: { session: false, title: 'navigation.login.title' },
        props: (route) => ({ code: route.query.code, callback: route.query.callback }),
    },
    {
        path: '/logout',
        name: 'LogoutView',
        component: () => import('./views/session/LogoutView.vue'),
        meta: { session: true, title: 'navigation.logout.title', analyticsIgnore: true },
    },
    {
        path: '/callback',
        name: 'CallbackView',
        component: () => import('./views/session/CallbackView.vue'),
        meta: { title: 'navigation.callback', visible: false, analyticsIgnore: true },
        props: (route) => ({ code: route.query.code }),
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFoundView',
        component: () => import('./views/errors/NotFound.vue'),
        meta: { title: 'navigation.home.title', visible: false },
    },
];

const scrollBehavior: RouterScrollBehavior = (to) => {
    if (to.hash) {
        return { selector: to.hash };
    }
    return { left: 0, top: 0 };
};

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes,
    scrollBehavior,
});
router.beforeEach((to, from, next) => {
    const store = useMainStore();
    const sessionStore = useSessionStore();
    store.hideNavigation = to.meta.hideNavigation != undefined && to.meta.hideNavigation == true;
    store.breadcrumb = '';
    if (!store.callback && to.query.callback) {
        store.callback = to.query.callback as string;
    }

    if (to.meta.session == undefined) {
        next();
    } else {
        if (!sessionStore.hasCurrentUser && to.meta.session === true) {
            sessionStore
                .refresh()
                .then(() => {
                    next();
                })
                .catch(() => {
                    router.push({ path: '/login' });
                });
        } else if (
            (!sessionStore.hasCurrentUser && to.meta.session === false) ||
            (sessionStore.hasCurrentUser && to.meta.session === true) ||
            ['LoginView', 'ConsentView', 'LogoutView'].includes(to.name as string)
        ) {
            next();
        } else {
            router.push({ path: '/login' });
        }
        next();
    }
});
export { router };
