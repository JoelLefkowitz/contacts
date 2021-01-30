import { pickBy } from "lodash";

export function definedOnly(obj: Object) {
    return pickBy(obj, (x: unknown) => x !== undefined)
}
