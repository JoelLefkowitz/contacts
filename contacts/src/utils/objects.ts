export function mergeOver(obj: Object, data: Object): boolean{
    let updated = false;
    for (let key of Object.keys(data)) {
        if (key in obj) {
            obj[key] = data[key]
            updated = true;
        }
    }
    return updated
}