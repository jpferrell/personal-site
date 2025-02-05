'use client'

import { useState, useEffect } from "react"

import SigMfTextInput from "./SigMfTextInput"
import SigMfNumberInput from "./SigMfNumberInput"
import SigMfGeoInput from "../SigMfGeoInput"
import { SigMfGeoType, SigMfSignalEmitterType } from "../SigMfInterfaces"

export default function SigMfEmitterInput( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function})
{
    const [seid, setSeid] = useState<number|null>(null);
    const [manu, setManu] = useState<string|null>(null);
    const [txPwr, setTxPwr] = useState<number|null>(null);
    const [eirpPwr, setEirpPwr] = useState<number|null>(null);
    const [geo, setGeo] = useState<SigMfGeoType|null>(null);

    const [sigEmit, setSigEmit] = useState<SigMfSignalEmitterType>({});

    function changeTextInput(variable: string|null, keyName: keyof typeof sigEmit) {
        if (variable !== null && variable !== "") {
            setSigEmit({...sigEmit, [keyName]: variable});
        } else if (Object.hasOwn(sigEmit, keyName)) {
            const tmpObj: SigMfSignalEmitterType = {...sigEmit};
            delete tmpObj[keyName];
            setSigEmit(tmpObj);
        }
    }

    function changeNumberInput(variable: number|null, keyName: keyof typeof sigEmit) {
        if (variable !== null) {
            setSigEmit({...sigEmit, [keyName]: variable});
        } else if (Object.hasOwn(sigEmit, keyName)) {
            const tmpObj: SigMfSignalEmitterType = {...sigEmit};
            delete tmpObj[keyName];
            setSigEmit(tmpObj);
        }
    }

    function changeGeoInput(variable: SigMfGeoType|null, keyName: keyof typeof sigEmit) {
        if (variable !== null) {
            setSigEmit({...sigEmit, [keyName]: variable});
        } else if (Object.hasOwn(sigEmit, keyName)) {
            const tmpObj = {...sigEmit};
            delete tmpObj[keyName];
            setSigEmit(tmpObj);
        }
    }

    useEffect(() => {
        changeNumberInput(seid, 'seid');
    }, [seid]);

    useEffect(() => {
        changeTextInput(manu, 'manufacturer');
    }, [manu]);

    useEffect(() => {
        changeNumberInput(txPwr, 'power_tx');
    }, [txPwr]);

    useEffect(() => {
        changeNumberInput(eirpPwr, 'power_eirp');
    }, [eirpPwr]);

    useEffect(() => {
        changeGeoInput(geo, 'geolocation');
    }, [geo]);

    useEffect(() => {
        changeFunction(sigEmit);
    }, [sigEmit])

    return (
        <div id={`${idPart}-sig-emitter-inputs-container`}>
            <SigMfNumberInput id={`${idPart}-emit-seid-input`} label="SEID" hidden={isHidden} placeholder="0" changeFunction={setSeid} />
            <SigMfTextInput label="Manufacturer" id={`${idPart}-emit-manu-input`} hidden={isHidden} placeholder="Manufacturer of the hardware" changeFunction={setManu} />
            <SigMfNumberInput label="Tx Power (dBm)" id={`${idPart}-emit-txpwr-input`} hidden={isHidden} placeholder="0" changeFunction={setTxPwr} />
            <SigMfNumberInput label="Effective Isotropic Radiated Power (dBm)" id={`${idPart}-emit-eirppwr-input`} hidden={isHidden} placeholder="0.0" changeFunction={setEirpPwr} />
            <SigMfGeoInput idPart="sig-emit" isHidden={isHidden} changeFunction={setGeo} />
        </div>
    );
}