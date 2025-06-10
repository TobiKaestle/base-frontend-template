import i18n from '@/i18n';
import { useSessionStore } from '@/stores/SessionStore';
import { RouteRecordRaw } from 'vue-router';

import 'vue-router';
declare module 'vue-router' {
    interface RouteMeta {
        permissions?: string | Array<string> | undefined;
        visible?: boolean;
        session?: boolean;
    }
}

const navigationList = (currentRoutes: readonly RouteRecordRaw[]): RouteRecordRaw[] => {
    const { t } = i18n.global;
    const store = useSessionStore();
    return currentRoutes.filter((route) => {
        // Check for correct meta
        if (route.meta == undefined) {
            route.meta = { title: t('undefined') };
            return true;
        }

        // Check visibility
        if (route.meta.visible != undefined && !route.meta.visible) {
            return false;
        }
        // Check session
        if (route.meta.session != undefined) {
            if (
                (store?.hasCurrentUser && route.meta.session == false) ||
                (!store?.hasCurrentUser && route.meta.session == true)
            ) {
                return false;
            }
        }
        if (route.meta.permissions != undefined) {
            if (!store.hasCurrentUser) {
                return false;
            }
            if (!store.hasPermission(route.meta.permissions)) {
                return false;
            }
        }
        return true;
    });
};

export { navigationList };
