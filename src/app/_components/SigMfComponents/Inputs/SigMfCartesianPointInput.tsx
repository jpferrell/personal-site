'use client'

import { useEffect, useState } from "react"
import { SigMfCartesianPointType } from "../SigMfInterfaces";
import SigMfCheckboxInput from "./SigMfCheckboxInput";
import { changeStateInput } from "../SigMfFunctions";

export default function SigMfCartesianPoint( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [point, setPoint] = useState<number[]|null>([]);
    const [isUnk, setIsUnk] = useState<boolean>(false);

    const [cartPnt, setCartPnt] = useState<SigMfCartesianPointType>({
        enabled: false
    });

    useEffect(() => {
        setCartPnt({...cartPnt, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        /** Putting this as a changeStateInput had an exceeded max depth error */
        setCartPnt({...cartPnt, unknown: isUnk});
    }, [isUnk]);

    useEffect(() => {
        if (cartPnt.enabled) {
            const retObj: SigMfCartesianPointType = {...cartPnt};
            delete retObj.enabled;
            console.log(isUnk);
            console.log(retObj);
            changeFunction(retObj);
        } else {
            changeFunction(null);
        }
    }, [cartPnt]);

    return (
        <div id={`${idPart}-cart-point-container`} hidden={isHidden}>
            <SigMfCheckboxInput label={`${labelPart} Cartesian Point`} id={`${idPart}-cart-point-enable-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            {/*<SigMfCheckboxInput label={`${labelPart} Point`} id={`${idPart}-point-enabled-input`} changeFunction={}*/}
            <SigMfCheckboxInput label={`${labelPart} Point Unknown`} id={`${idPart}-point-unknown-enabled-input`} changeFunction={setIsUnk} hidden={isHidden || !isEnabled} />
        </div>
    );
}