'use client'

import { SigMfGeoType } from "./SigMfInterfaces";

type retFunction = (a: object) => void;

export function changeStateInput<T extends object, U extends object>(obj: T, variable: U|SigMfGeoType|number|boolean|string, keyName: keyof typeof obj, fn: retFunction) {
    if (variable !== null && variable !== "") {
        fn({...obj, [keyName]: variable});
    } else if (Object.hasOwn(obj, keyName)) {
        const tmpObj = {...obj};
        delete tmpObj[keyName];
        fn(tmpObj);
    }
}

export function cleanObject(obj: object) {
    for (const key in obj) {
        if (typeof obj[key as keyof typeof obj] === 'object') {
            if (Object.keys(obj[key as keyof typeof obj]).length === 0) {
                delete obj[key as keyof typeof obj];
            }
        } else if (obj[key as keyof typeof obj] === "") {
            delete obj[key as keyof typeof obj];
        }
    }

    return obj;
}
