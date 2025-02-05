'use client'

import { useState, useEffect } from "react"

import SigMfSelectInput from "./SigMfSelectInput"
import SigMfTextInput from "./SigMfTextInput"
import SigMfNumberInput from "./SigMfNumberInput";
import { SigMfSignalDetailType } from "../SigMfInterfaces";
import { changeStateInput, changeStateTextInput } from "../SigMfFunctions";

export default function SigMfDetailInput( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function})
{
    const [type, setType] = useState<string|null>(null);
    const [modClass, setModClass] = useState<string|null>(null);
    const [standard, setStandard] = useState<string|null>(null);
    const [carVar, setCarVar] = useState<string|null>(null);
    const [symVar, setSymVar] = useState<string|null>(null);
    const [order, setOrder] = useState<number|null>(null);
    const [duplex, setDuplex] = useState<string|null>(null);
    const [multiplex, setMultiplex] = useState<string|null>(null);
    const [multAcc, setMultAcc] = useState<string|null>(null);
    const [spreading, setSpreading] = useState<string|null>(null);
    const [bw, setBw] = useState<number|null>(null);
    const [channel, setChannel] = useState<number|null>(null);
    const [classVar, setClassVar] = useState<string|null>(null);

    const [sigDet, setSigDet] = useState<SigMfSignalDetailType>({});

    useEffect(() => {
       changeStateTextInput(sigDet, type, 'type', setSigDet);
    }, [type]);

    useEffect(() => {
        changeStateTextInput(sigDet, modClass, 'mod_class', setSigDet);
    }, [modClass]);

    useEffect(() => {
        changeStateTextInput(sigDet, standard, 'standard', setSigDet);
    }, [standard]);

    useEffect(() => {
        changeStateTextInput(sigDet, carVar, 'carrier_variant', setSigDet);
    }, [carVar]);

    useEffect(() => {
        changeStateTextInput(sigDet, symVar, 'symbol_variant', setSigDet);
    }, [symVar]);

    useEffect(() => {
        changeStateInput(sigDet, order, 'order', setSigDet);
    }, [order]);

    useEffect(() => {
        changeStateTextInput(sigDet, duplex, 'duplexing', setSigDet);
    }, [duplex]);

    useEffect(() => {
        changeStateTextInput(sigDet, multiplex, 'multiplexing', setSigDet);
    }, [multiplex]);

    useEffect(() => {
        changeStateTextInput(sigDet, multAcc, 'multiple_access', setSigDet);
    }, [multAcc]);

    useEffect(() => {
        changeStateTextInput(sigDet, spreading, 'spreading', setSigDet);
    }, [spreading]);

    useEffect(() => {
        changeStateInput(sigDet, bw, 'channel_bw', setSigDet);
    }, [bw]);

    useEffect(() => {
        changeStateInput(sigDet, channel, 'channel', setSigDet);
    }, [channel]);

    useEffect(() => {
        changeStateTextInput(sigDet, classVar, 'class_variant', setSigDet);
    }, [classVar]);

    useEffect(() => {
        changeFunction(sigDet);
    }, [sigDet]);

    return (
        <div id={`${idPart}-detail-inputs-container`}>
            <SigMfSelectInput label="Type" id={`${idPart}-detail-type-input`} hidden={isHidden} changeFunction={setType} values={["analog", "digital"]} />
            <SigMfSelectInput label="Modulation Class" id={`${idPart}-detail-mod-class-input`} hidden={isHidden} changeFunction={setModClass} values={[
                "am", "fm", "pm", "ssb", "dsb", "vsb", "ask", "fsk", "psk", "qam", "ook", "cpm", "msk"
            ]} />
            <SigMfTextInput label="Standard" id={`${idPart}-detail-standard-input`} hidden={isHidden} changeFunction={setStandard} placeholder="e.g. 802.11ac" />
            <SigMfSelectInput label="Carrier Variant" id={`${idPart}-detail-carrier-var-input`} hidden={isHidden} changeFunction={setCarVar} values={[
                "with_carrier", "suppressed_carrier", "reduced_carrier", "single_carrier", "multi_carrier"
            ]} />
            <SigMfSelectInput label="Symbol Variant" id={`${idPart}-detail-symbol-var-input`} hidden={isHidden} changeFunction={setSymVar} values={["differential", "offset"]} />
            <SigMfNumberInput label="Order" id={`${idPart}-detail-order-input`} placeholder="0" hidden={isHidden} changeFunction={setOrder} />
            <SigMfSelectInput label="Duplexing" id={`${idPart}-detail-duplex-input`} hidden={isHidden} changeFunction={setDuplex} values={["tdd", "fdd"]} />
            <SigMfSelectInput label="Multiplexing" id={`${idPart}-detail-multiplex-input`} hidden={isHidden} changeFunction={setMultiplex} values={[
                "tdm", "fdm", "cdm", "ofdm", "sdm", "pdm"
            ]} />
            <SigMfSelectInput label="Mulitple Access" id={`${idPart}-detail-mult-acc-input`} hidden={isHidden} changeFunction={setMultAcc} values={[
                "fdma", "ofdma", "tdma" , "cdma", "sdma", "pdma"
            ]} />
            <SigMfSelectInput label="Spreading" id={`${idPart}-detail-spreading-input`} hidden={isHidden} changeFunction={setSpreading} values={[
                "fhss", "thss", "dsss", "css"
            ]} />
            <SigMfNumberInput label="Bandwidth" id={`${idPart}-detail-bw-input`} hidden={isHidden} changeFunction={setBw} placeholder="0.0" />
            <SigMfNumberInput label="Channel" id={`${idPart}-detail-channel-input`} hidden={isHidden} placeholder="0" changeFunction={setChannel} />
            <SigMfTextInput label="Class Variant" id={`${idPart}-detail-class-var-input`} hidden={isHidden} placeholder="i.e. pi/4-DQPSK" changeFunction={setClassVar} />
        </div>
    );
}