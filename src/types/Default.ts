export type Modified = {
    created: number;
    updated: number;
};

export type DropdownOption = {
    label: string;
    value: string;
};

export type Url = {
    id: string;
    title: string;
    url: string;
};

export type Role = {
    name: string;
    label: string;
    user_id: string;
};

export type Money = {
    amount: number;
    currency: string;
};
