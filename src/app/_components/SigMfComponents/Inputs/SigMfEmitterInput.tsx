'use client'

import { useState, useEffect } from "react"

import SigMfTextInput from "./SigMfTextInput"
import SigMfNumberInput from "./SigMfNumberInput"
import SigMfGeoInput from "../SigMfGeoInput"
import { SigMfGeoType, SigMfSignalEmitterType } from "../SigMfInterfaces"
import { changeStateInput } from "../SigMfFunctions"

type ChangeFunction = (a: object|string) => void;

export default function SigMfEmitterInput( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [seid, setSeid] = useState<number|string>("");
    const [manu, setManu] = useState<string>("");
    const [txPwr, setTxPwr] = useState<number|string>("");
    const [eirpPwr, setEirpPwr] = useState<number|string>("");
    const [geo, setGeo] = useState<SigMfGeoType|string>("");

    const [sigEmit, setSigEmit] = useState<SigMfSignalEmitterType>({});

    useEffect(() => {
        changeStateInput(sigEmit, seid, 'seid', setSigEmit);
    }, [seid]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(sigEmit, manu, 'manufacturer', setSigEmit);
    }, [manu]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(sigEmit, txPwr, 'power_tx', setSigEmit);
    }, [txPwr]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(sigEmit, eirpPwr, 'power_eirp', setSigEmit);
    }, [eirpPwr]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(sigEmit, geo, 'geolocation', setSigEmit);
    }, [geo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeFunction(sigEmit);
    }, [sigEmit]); // eslint-disable-line react-hooks/exhaustive-deps

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