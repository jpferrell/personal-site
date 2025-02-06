'use client'

import { useEffect, useState } from "react"
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import { SigMfSpatialGlobalType } from "../SigMfInterfaces";
import SigMfNumberInput from "../Inputs/SigMfNumberInput";

export function SpatialGlobal( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [numEl, setNumEl] = useState<number|null>(null);
    const [chanIdx, setChanIdx] = useState<number|null>(null);

    const [spatial, setSpatial] = useState<SigMfSpatialGlobalType>({
        enabled: false,
        num_elements: null,
        channel_index: null
    });

    useEffect(() => {
        setSpatial({...spatial, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        setSpatial({...spatial, num_elements: numEl});
    }, [numEl]);

    useEffect(() => {
        setSpatial({...spatial, channel_index: chanIdx});
    }, [chanIdx]);

    useEffect(() => {
        if (spatial.enabled) {
            const retObj: SigMfSpatialGlobalType = {...spatial};
            delete retObj.enabled;
            changeFunction(retObj);
        } else {
            changeFunction(null);
        }
    }, [spatial]);

    return (
        <div id="spatial-global-container">
            <SigMfCheckboxInput label="Spatial" id="spatial-global-enable-input" changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput id={`${idPart}-spatial-global-num-els-input`} label="Number Elements" hidden={isHidden || !isEnabled} changeFunction={setNumEl} required />
            <SigMfNumberInput id={`${idPart}-spatial-global-chan-idx-input`} label="Channel Index" hidden={isHidden || !isEnabled} changeFunction={setChanIdx} required />
        </div>
    );
}

export function SpatialCapture( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    return (
        <div id="spatial-annotation-container">
            
        </div>
    );
}

export function SpatialAnnotation( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    return (
        <div id="spatial-annotation-container">
            
        </div>
    );
}