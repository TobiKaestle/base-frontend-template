import { DropdownOption, Modified } from './Default';

export type ExampleCreate = {
    name: string;
    description: string;
};

export type Example = ExampleCreate & {
    id: string;
    index?: number;
    name: string;
    description: string;
    modified: Modified;
};

export type ExampleDropdown = Example & DropdownOption;
