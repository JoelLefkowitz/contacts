export interface Image {
    id: number,
    name: string,
    image: string
}

export interface ImagePayload {
    name: string,
    image: File
}
