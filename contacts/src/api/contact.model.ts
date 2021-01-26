export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    icon: number | null;
    photos: number[];
    phoneNumber: string | null;
    notes: string[];
}

export type ContactPayload = Omit<Contact, "id" >;


