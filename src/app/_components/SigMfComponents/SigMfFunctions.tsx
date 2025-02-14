'use client'

import { SigMfGeoType } from "./SigMfInterfaces";

export function changeStateTextInput<T extends Object>(obj: T, variable: string|null, keyName: keyof typeof obj, fn: Function) {
    if (variable !== null && variable !== "") {
        fn({...obj, [keyName]: variable});
    } else if (Object.hasOwn(obj, keyName)) {
        const tmpObj: T = {...obj};
        delete tmpObj[keyName];
        fn(tmpObj);
    }
}

export function changeStateInput<T extends Object, U extends Object>(obj: T, variable: U|SigMfGeoType|number|boolean|null, keyName: keyof typeof obj, fn: Function) {
    if (variable !== null) {
        fn({...obj, [keyName]: variable});
    } else if (Object.hasOwn(obj, keyName)) {
        const tmpObj = {...obj};
        delete tmpObj[keyName];
        fn(tmpObj);
    }
}
