'use client'

import { useEffect, useState } from "react"
import { SigMfCartesianPointType } from "../SigMfInterfaces";
import SigMfCheckboxInput from "./SigMfCheckboxInput";
//import { changeStateInput } from "../SigMfFunctions";
import SigMfNumberInput from "./SigMfNumberInput";

type ChangeFunction = (a: object|string) => void;

export default function SigMfCartesianPoint( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [xPoint, setXPoint] = useState<number|string>("");
    const [yPoint, setYPoint] = useState<number|string>("");
    const [zPoint, setZPoint] = useState<number|string>("");
    const [isUnk, setIsUnk] = useState<boolean>(false);

    const [cartPnt, setCartPnt] = useState<SigMfCartesianPointType>({
        enabled: false
    });

    useEffect(() => {
        setCartPnt({...cartPnt, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        /** Putting this as a changeStateInput had an exceeded max depth error */
        setCartPnt({...cartPnt, unknown: isUnk});
    }, [isUnk]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (cartPnt.enabled) {
            if (isUnk) {
                changeFunction({unknown: true});
            } else {
                if (xPoint !== "" && yPoint !== "" && zPoint !== "") {
                    changeFunction({point: [xPoint, yPoint, zPoint]});
                } else {
                    changeFunction({});
                }
            }
        } else {
            changeFunction({});
        }
    }, [isUnk, xPoint, yPoint, zPoint]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id={`${idPart}-cart-point-container`} hidden={isHidden} className="border-dotted rounded-lg border-2 m-2">
            <SigMfCheckboxInput label={`${labelPart} Cartesian Point`} id={`${idPart}-cart-point-enable-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput label={`${labelPart} Point X`} id={`${idPart}-point-x-input`} hidden={isHidden || !isEnabled} changeFunction={setXPoint} isDisabled={isUnk} />
            <SigMfNumberInput label={`${labelPart} Point Y`} id={`${idPart}-point-y-input`} hidden={isHidden || !isEnabled} changeFunction={setYPoint} isDisabled={isUnk}/>
            <SigMfNumberInput label={`${labelPart} Point Z`} id={`${idPart}-point-z-input`} hidden={isHidden || !isEnabled} changeFunction={setZPoint} isDisabled={isUnk}/>
            <SigMfCheckboxInput label={`${labelPart} Point Unknown`} id={`${idPart}-point-unknown-enabled-input`} changeFunction={setIsUnk} hidden={isHidden || !isEnabled} />
        </div>
    );
}