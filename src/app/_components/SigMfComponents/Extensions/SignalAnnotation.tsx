'use client'

import { useEffect, useState } from "react"
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import SigMfEmitterInput from "../Inputs/SigMfEmitterInput";
import SigMfDetailInput from "../Inputs/SigMfDetailInput";
import { SigMfSignalDetailType, SigMfSignalEmitterType, SigMfSignalType } from "../SigMfInterfaces";
import { changeStateInput } from "../SigMfFunctions";

export function SignalAnnotation( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{

    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    const [sigDet, setSigDet] = useState<SigMfSignalDetailType>({});
    const [sigEmit, setSigEmit] = useState<SigMfSignalEmitterType>({});

    const [sig, setSig] = useState<SigMfSignalType>({enabled: false});

    useEffect(() => {
        setSig({...sig, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(sig, sigDet, 'signal:detail', setSig);
    }, [sigDet]);

    useEffect(() => {
        changeStateInput(sig, sigEmit, 'signal:emitter', setSig);
    }, [sigEmit]);

    function isObjectEmpty(obj: object) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    useEffect(() => {
        if (sig.enabled) {
            const retObj: SigMfSignalType = {...sig};
            delete retObj.enabled;
            if (isObjectEmpty(retObj["signal:detail"])) {
                delete retObj["signal:detail"];
            }
            if (isObjectEmpty(retObj["signal:emitter"])) {
                delete retObj["signal:emitter"];
            }
            changeFunction(retObj);
        }
    }, [sig]);

    return (
        <div id="annotation-sig-ext-container" hidden={isHidden} className="border-4 dark:border-slate-200">
            <SigMfCheckboxInput label="Signal" id={`${idPart}-sig-enabled-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfDetailInput idPart={idPart} isHidden={isHidden || !isEnabled} changeFunction={setSigDet} />
            <SigMfEmitterInput idPart={idPart} isHidden={isHidden || !isEnabled} changeFunction={setSigEmit} />
        </div>
    );
}