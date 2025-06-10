/// <reference types="vite/client" />
declare module '@vivaconagua/vueca';
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
    export default component;
}

declare module '*.svg' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent;
    export default component;
}

declare module '*.png' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent;
    export default component;
}
