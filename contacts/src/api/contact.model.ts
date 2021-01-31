import {Image, ImagePayload} from "./image.model";
export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    icon: Image | null;
    notes: string[];
    photos: Image[];
}


export interface ContactPayload {
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    icon: ImagePayload | null;
    notes: string[];
    photos: ImagePayload[];
}