import {Image, ImagePayload} from "./image.model";
export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    icon: Image | null;
    photos: Image[];
    phoneNumber: string | null;
    notes: string[];
}


export interface ContactPayload {
    firstName: string;
    lastName: string;
    icon: ImagePayload | null;
    photos: ImagePayload[];
    phoneNumber: string | null;
    notes: string[];
}