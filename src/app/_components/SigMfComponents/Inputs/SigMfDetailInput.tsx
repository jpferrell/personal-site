'use client'

import { useState, useEffect } from "react"

import SigMfSelectInput from "./SigMfSelectInput"
import SigMfTextInput from "./SigMfTextInput"
import SigMfNumberInput from "./SigMfNumberInput";
import { SigMfSignalDetailType } from "../SigMfInterfaces";

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
        if (type !== null && type !== "") {
            setSigDet({...sigDet, type: type});
        } else if (Object.hasOwn(sigDet, 'type')) {
            const tmpObj = {...sigDet};
            delete tmpObj.type;
            setSigDet(tmpObj);
        }
    }, [type]);

    useEffect(() => {
        if (modClass !== null && modClass !== "") {
            setSigDet({...sigDet, mod_class: modClass});
        } else if (Object.hasOwn(sigDet, 'mod_class')) {
            const tmpObj = {...sigDet};
            delete tmpObj.mod_class;
            setSigDet(tmpObj);
        }
    }, [modClass]);

    useEffect(() => {
        if (standard !== null && standard !== "") {
            setSigDet({...sigDet, standard: standard});
        } else if (Object.hasOwn(sigDet, 'standard')) {
            const tmpObj = {...sigDet};
            delete tmpObj.standard;
            setSigDet(tmpObj);
        }
    }, [standard]);

    useEffect(() => {
        if (carVar !== null && carVar !== "") {
            setSigDet({...sigDet, carrier_variant: carVar});
        } else if (Object.hasOwn(sigDet, 'carrier_variant')) {
            const tmpObj = {...sigDet};
            delete tmpObj.carrier_variant;
            setSigDet(tmpObj);
        }
    }, [carVar]);

    useEffect(() => {
        if (symVar !== null && symVar !== "") {
            setSigDet({...sigDet, symbol_variant: symVar});
        } else if (Object.hasOwn(sigDet, 'symbol_variant')) {
            const tmpObj = {...sigDet};
            delete tmpObj.symbol_variant;
            setSigDet(tmpObj);
        }
    }, [symVar]);

    useEffect(() => {
        if (order !== null) {
            setSigDet({...sigDet, order: order});
        } else if (Object.hasOwn(sigDet, 'order')) {
            const tmpObj = {...sigDet};
            delete tmpObj.order;
            setSigDet(tmpObj);
        }
    }, [order]);

    useEffect(() => {
        if (duplex !== null && duplex !== "") {
            setSigDet({...sigDet, duplexing: duplex});
        } else if (Object.hasOwn(sigDet, 'duplexing')) {
            const tmpObj = {...sigDet};
            delete tmpObj.duplexing;
            setSigDet(tmpObj);
        }
    }, [duplex]);

    useEffect(() => {
        if (multiplex !== null && multiplex !== "") {
            setSigDet({...sigDet, multiplexing: multiplex});
        } else if (Object.hasOwn(sigDet, 'multiplexing')) {
            const tmpObj = {...sigDet};
            delete tmpObj.multiplexing;
            setSigDet(tmpObj);
        }
    }, [multiplex]);

    useEffect(() => {
        if (multAcc !== null && multAcc !== "") {
            setSigDet({...sigDet, multiple_access: multAcc});
        } else if (Object.hasOwn(sigDet, 'multiple_access')) {
            const tmpObj = {...sigDet};
            delete tmpObj.multiple_access;
            setSigDet(tmpObj);
        }
    }, [multAcc]);

    useEffect(() => {
        if (spreading !== null && spreading !== "") {
            setSigDet({...sigDet, spreading: spreading});
        } else if (Object.hasOwn(sigDet, 'spreading')) {
            const tmpObj = {...sigDet};
            delete tmpObj.spreading;
            setSigDet(tmpObj);
        }
    }, [spreading]);

    useEffect(() => {
        if (bw !== null) {
            setSigDet({...sigDet, channel_bw: bw});
        } else if (Object.hasOwn(sigDet, 'channel_bw')) {
            const tmpObj = {...sigDet};
            delete tmpObj.channel_bw;
            setSigDet(tmpObj);
        }
    }, [bw]);

    useEffect(() => {
        if (channel !== null) {
            setSigDet({...sigDet, channel: channel});
        } else if (Object.hasOwn(sigDet, 'channel')) {
            const tmpObj = {...sigDet};
            delete tmpObj.channel;
            setSigDet(tmpObj);
        }
    }, [channel]);

    useEffect(() => {
        if (classVar !== null && classVar !== "") {
            setSigDet({...sigDet, class_variant: classVar});
        } else if (Object.hasOwn(sigDet, 'class_variant')) {
            const tmpObj = {...sigDet};
            delete tmpObj.class_variant;
            setSigDet(tmpObj);
        }
    }, [classVar]);

    useEffect(() => {
        changeFunction(sigDet);
    }, [sigDet]);

    return (
        <div id={`${idPart}-detail-inputs-container`}>
            <SigMfSelectInput label="Type" id={`${idPart}-detail-type-input`} hidden={isHidden} changeFunction={setType} values={["", "analog", "digital"]} />
            <SigMfSelectInput label="Modulation Class" id={`${idPart}-detail-mod-class-input`} hidden={isHidden} changeFunction={setModClass} values={[
                "", "am", "fm", "pm", "ssb", "dsb", "vsb", "ask", "fsk", "psk", "qam", "ook", "cpm", "msk"
            ]} />
            <SigMfTextInput label="Standard" id={`${idPart}-detail-standard-input`} hidden={isHidden} changeFunction={setStandard} placeholder="e.g. 802.11ac" />
            <SigMfSelectInput label="Carrier Variant" id={`${idPart}-detail-carrier-var-input`} hidden={isHidden} changeFunction={setCarVar} values={[
                "", "with_carrier", "suppressed_carrier", "reduced_carrier", "single_carrier", "multi_carrier"
            ]} />
            <SigMfSelectInput label="Symbol Variant" id={`${idPart}-detail-symbol-var-input`} hidden={isHidden} changeFunction={setSymVar} values={["", "differential", "offset"]} />
            <SigMfNumberInput label="Order" id={`${idPart}-detail-order-input`} placeholder="0" hidden={isHidden} changeFunction={setOrder} />
            <SigMfSelectInput label="Duplexing" id={`${idPart}-detail-duplex-input`} hidden={isHidden} changeFunction={setDuplex} values={["", "tdd", "fdd"]} />
            <SigMfSelectInput label="Multiplexing" id={`${idPart}-detail-multiplex-input`} hidden={isHidden} changeFunction={setMultiplex} values={[
                "", "tdm", "fdm", "cdm", "ofdm", "sdm", "pdm"
            ]} />
            <SigMfSelectInput label="Mulitple Access" id={`${idPart}-detail-mult-acc-input`} hidden={isHidden} changeFunction={setMultAcc} values={[
                "", "fdma", "ofdma", "tdma" , "cdma", "sdma", "pdma"
            ]} />
            <SigMfSelectInput label="Spreading" id={`${idPart}-detail-spreading-input`} hidden={isHidden} changeFunction={setSpreading} values={[
                "", "fhss", "thss", "dsss", "css"
            ]} />
            <SigMfNumberInput label="Bandwidth" id={`${idPart}-detail-bw-input`} hidden={isHidden} changeFunction={setBw} placeholder="0.0" />
            <SigMfNumberInput label="Channel" id={`${idPart}-detail-channel-input`} hidden={isHidden} placeholder="0" changeFunction={setChannel} />
            <SigMfTextInput label="Class Variant" id={`${idPart}-detail-class-var-input`} hidden={isHidden} placeholder="i.e. pi/4-DQPSK" changeFunction={setClassVar} />
        </div>
    );
}