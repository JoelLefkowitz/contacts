import {Image, ImagePayload} from "./image.model";

import { hasID } from "./common";

interface PrivateFields {
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    notes: string[] | null;
}

interface ImageFields {
    icon: Image | null;
    photos: Image[];
}

// (Image | ImagePayload) for poth creating and updating.
// This is to allow the reuse of upload images when creating and to update in place.
interface ImagePayloadFields {    
    icon: Image | ImagePayload | null;
    photos: (Image | ImagePayload)[];
}

export type Contact = hasID & PrivateFields & ImageFields;
export type CreateContactPayload = PrivateFields & ImagePayloadFields;
export type UpdateContactPayload = hasID & PrivateFields & ImagePayloadFields;
