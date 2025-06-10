import { DropdownOption, Modified } from './Default';

export interface ExampleCreate {
    name: string;
    description: string;
}

export interface Example extends ExampleCreate {
    id: string;
    index?: number;
    name: string;
    description: string;
    modified: Modified;
}

export interface ExampleDropdown extends Example, DropdownOption {}
