import { notification } from '@/composables/notification';
import { Example, ExampleDropdown } from '@/types/Example';
import { required } from '@vuelidate/validators';
import { defineStore } from 'pinia';
import api from './api';

interface ExampleState {
    create: Example;
    current: Example;
    edit: Example;
    doCreate: boolean;
    doEdit: boolean;
    doView: boolean;
    list: Example[];
}

const defaultExample = {
    id: '',
    name: '',
    description: '',
} as Example;

export const useExamplesStore = defineStore('ExamplesStore', {
    state: () => {
        return {
            create: JSON.parse(JSON.stringify(defaultExample)) as Example,
            current: {} as Example,
            edit: {} as Example,
            doCreate: false,
            doEdit: false,
            doView: false,
            list: [] as Example[],
        } as ExampleState;
    },
    getters: {
        validations: () => {
            return {
                data: {
                    name: { required },
                },
            };
        },
        dropdown: (state) => {
            const list = state.list;
            return list.map((el) => {
                return {
                    ...{
                        value: el.id,
                        name: el.name,
                        label: el.name,
                    },
                    ...el,
                };
            }) as ExampleDropdown[];
        },
    },
    actions: {
        resetCreate() {
            this.create = JSON.parse(JSON.stringify(defaultExample)) as Example;
        },
        resetCurrent() {
            this.current = {} as Example;
        },
        resetEdit() {
            this.edit = JSON.parse(JSON.stringify(this.current)) as Example;
        },
        resetList() {
            this.list = [] as Example[];
        },
        getList() {
            return new Promise((resolve, reject) => {
                api.call
                    .get('/examples')
                    .then((response) => {
                        this.list = response.data.payload
                            ? (response.data.payload as Example[])
                            : [];
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        add() {
            return new Promise((resolve, reject) => {
                api.call
                    .post('/examples', this.create)
                    .then((response) => {
                        notification({
                            type: response.data.type,
                            title: 'messages.title.success',
                            text: 'example.created.success',
                        });
                        resolve(response.data.payload);
                    })
                    .catch((error) => {
                        notification({
                            type: 'error',
                            title: 'messages.title.error',
                            text:
                                'example.created.' +
                                error.response.data.message.replaceAll(' ', '_'),
                        });
                        reject(error);
                    });
            });
        },
        get(id: string) {
            return new Promise((resolve, reject) => {
                api.call
                    .get('/examples/' + id)
                    .then((response) => {
                        this.current = response.data.payload;
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        update() {
            return new Promise((resolve, reject) => {
                api.call
                    .put('/examples', this.edit)
                    .then((response) => {
                        notification({
                            type: response.data.type,
                            title: 'messages.title.success',
                            text: 'example.updated.success',
                        });
                        this.current = response.data.payload;
                        this.resetEdit();
                        resolve(response.data.payload);
                    })
                    .catch((error) => {
                        notification({
                            type: 'error',
                            title: 'messages.title.error',
                            text:
                                'example.updated.' +
                                error.response.data.message.replaceAll(' ', '_'),
                        });
                        reject(error);
                    });
            });
        },
        delete() {
            return new Promise((resolve, reject) => {
                api.call
                    .delete('/examples/' + this.current.id)
                    .then((response) => {
                        this.current = {} as Example;
                        notification({
                            type: response.data.type,
                            title: 'messages.title.success',
                            text: 'example.deleted.success',
                        });
                        resolve(response.data.payload);
                    })
                    .catch((error) => {
                        notification({
                            type: 'error',
                            title: 'messages.title.error',
                            text:
                                'example.deleted.' +
                                error.response.data.message.replaceAll(' ', '_'),
                        });
                        reject(error);
                    });
            });
        },
    },
});
