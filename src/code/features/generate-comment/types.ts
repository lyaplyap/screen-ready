export type Attribute = {
    id: string;
    value: string;
};

export type Role = {
    role: string;
    attributes: Attribute[];
};
