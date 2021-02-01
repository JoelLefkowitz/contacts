import {Image, ImagePayload} from "./image.model";

import { hasID } from "./common";

interface PrivateFields {
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    notes: string[];
}

interface ImageFields {
    icon: Image;
    photos: Image[];
}

export type Contact = hasID & PrivateFields & ImageFields;
export type CreateContactPayload = PrivateFields
export type UpdateContactPayload = hasID & PrivateFields
