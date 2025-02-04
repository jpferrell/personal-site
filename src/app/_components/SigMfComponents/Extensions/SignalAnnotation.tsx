'use client'

import { useEffect, useState } from "react"
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import SigMfEmitterInput from "../Inputs/SigMfEmitterInput";
import SigMfDetailInput from "../Inputs/SigMfDetailInput";
import { SigMfSignalDetailType, SigMfSignalEmitterType, SigMfSignalType } from "../SigMfInterfaces";

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
        if (sigDet !== null) {
            setSig({...sig, "signal:detail": sigDet});
        } else if (Object.hasOwn(sig, 'signal:detail')) {
            const tmpObj = {...sig};
            delete tmpObj["signal:detail"];
            setSig(tmpObj);
        }
    }, [sigDet]);

    useEffect(() => {
        if (sigEmit !== null) {
            setSig({...sig, "signal:emitter": sigEmit});
        } else if (Object.hasOwn(sig, 'signal:emitter')) {
            const tmpObj = {...sig};
            delete tmpObj["signal:emitter"];
            setSig(tmpObj);
        }
    }, [sigEmit]);

    useEffect(() => {
        if (sig.enabled) {
            const retObj: SigMfSignalType = {...sig};
            delete retObj.enabled;
            changeFunction(retObj);
        }
    }, [sig]);

    return (
        <div id="annotation-sig-ext-container">
            <SigMfCheckboxInput label="Signal" id={`${idPart}-sig-enabled-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfDetailInput idPart={idPart} isHidden={isHidden || !isEnabled} changeFunction={setSigDet} />
            <SigMfEmitterInput idPart={idPart} isHidden={isHidden || !isEnabled} changeFunction={setSigEmit} />
        </div>
    );
}