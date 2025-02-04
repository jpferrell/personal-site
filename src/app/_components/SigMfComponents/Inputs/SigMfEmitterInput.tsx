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

    useEffect(() => {
        if (seid !== null) {
            setSigEmit({...sigEmit, seid: seid});
        } else if (Object.hasOwn(sigEmit, 'seid')) {
            const tmpObj = {...sigEmit};
            delete tmpObj.seid;
            setSigEmit(tmpObj);
        }
    }, [seid]);

    useEffect(() => {
        if (manu !== null && manu !== "") {
            setSigEmit({...sigEmit, manufacturer: manu});
        } else if (Object.hasOwn(sigEmit, 'manufacturer')) {
            const tmpObj = {...sigEmit};
            delete tmpObj.manufacturer;
            setSigEmit(tmpObj);
        }
    }, [manu]);

    useEffect(() => {
        if (txPwr !== null) {
            setSigEmit({...sigEmit, power_tx: txPwr});
        } else if (Object.hasOwn(sigEmit, 'power_tx')) {
            const tmpObj = {...sigEmit};
            delete tmpObj.power_tx;
            setSigEmit(tmpObj);
        }
    }, [txPwr]);

    useEffect(() => {
        if (eirpPwr !== null) {
            setSigEmit({...sigEmit, power_eirp: eirpPwr});
        } else if (Object.hasOwn(sigEmit, 'power_eirp')) {
            const tmpObj = {...sigEmit};
            delete tmpObj.power_eirp;
            setSigEmit(tmpObj);
        }
    }, [eirpPwr]);

    useEffect(() => {
        if (geo !== null) {
            setSigEmit({...sigEmit, geolocation: geo});
        } else if (Object.hasOwn(sigEmit, 'geolocation')) {
            const tmpObj = {...sigEmit};
            delete tmpObj.geolocation;
            setSigEmit(tmpObj);
        }
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