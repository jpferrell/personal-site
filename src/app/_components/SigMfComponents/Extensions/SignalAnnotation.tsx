'use client'

import { useEffect, useState } from "react"
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import SigMfEmitterInput from "../Inputs/SigMfEmitterInput";
import SigMfDetailInput from "../Inputs/SigMfDetailInput";
import { SigMfSignalDetailType, SigMfSignalEmitterType, SigMfSignalType } from "../SigMfInterfaces";
import { changeStateInput, cleanObject } from "../SigMfFunctions";

type ChangeFunction = (a: object) => void;

export function SignalAnnotation( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{

    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    const [sigDet, setSigDet] = useState<SigMfSignalDetailType>({});
    const [sigEmit, setSigEmit] = useState<SigMfSignalEmitterType>({});

    const [sig, setSig] = useState<SigMfSignalType>({enabled: false});

    useEffect(() => {
        setSig({...sig, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(sig, sigDet, 'signal:detail', setSig);
    }, [sigDet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(sig, sigEmit, 'signal:emitter', setSig);
    }, [sigEmit]); // eslint-disable-line react-hooks/exhaustive-deps

    /*
    function isObjectEmpty(obj: object) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }
    */

    useEffect(() => {
       if (sig.enabled) {
            const tmpObj: SigMfSignalType = {...sig};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
       } else {
            changeFunction({});
       }
    }, [sig]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="annotation-sig-ext-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Signal" id={`${idPart}-sig-enabled-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfDetailInput idPart={idPart} isHidden={isHidden || !isEnabled} changeFunction={setSigDet} />
            <SigMfEmitterInput idPart={idPart} isHidden={isHidden || !isEnabled} changeFunction={setSigEmit} />
        </div>
    );
}