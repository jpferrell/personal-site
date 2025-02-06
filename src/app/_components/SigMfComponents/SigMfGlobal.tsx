'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput";
import SigMfCheckboxInput from "./Inputs/SigMfCheckboxInput";
import SigMfGeoInput from "./SigMfGeoInput";
import { SigMfGeoType, SigMfGlobalType, SigMfTraceabilityGlobalType } from "./SigMfInterfaces";
import SigMfSelectInput from "./Inputs/SigMfSelectInput";
import { changeStateInput, changeStateTextInput } from "./SigMfFunctions";
import { TraceabilityGlobal } from "./Extensions/Traceability";

export default function SigMfGlobal( { isHidden, transferData }: {isHidden: boolean, transferData: Function} ) {

    const [realCplx, setRealCplx] = useState<string|null>(null);
    const [leBe, setLeBe] = useState<string|null>(null);
    const [datatype, setDatatype] = useState<string|null>(null);
    const [sigmfDatatype, setSigmfDatatype] = useState<string|null>(null);
    const [sr, setSr] = useState<number|null>(null);
    const [author, setAuthor] = useState<string|null>(null);
    const [collection, setCollection] = useState<string|null>(null);
    const [dataset, setDataset] = useState<string|null>(null);
    const [dataDoi, setDataDoi] = useState<string|null>(null);
    const [desc, setDesc] = useState<string|null>(null);
    const [hw, setHw] = useState<string|null>(null);
    const [license, setLicense] = useState<string|null>(null);
    const [isMetaOnly, setIsMetaOnly] = useState<boolean>(false);
    const [metaDoi, setMetaDoi] = useState<string|null>(null);
    const [numChans, setNumChans] = useState<integer|null>(null);
    const [offset, setOffset] = useState<integer|null>(null);
    const [recorder, setRecorder] = useState<string|null>(null);
    const [sha, setSha] = useState<string|null>(null);
    const [trailBytes, setTrailBytes] = useState<integer|null>(null);
    const [version, setVersion] = useState<string|null>(null);
    const [geo, setGeo] = useState<SigMfGeoType|null>(null);
    const [trace, setTrace] = useState<SigMfTraceabilityGlobalType|null>(null);

    const [globalData, setGlobalData] = useState<SigMfGlobalType>({
        'core:datatype': null,
        'core:metadata_only': isMetaOnly,
        'core:version': null,
    });

    useEffect(() => {
        (realCplx !== null && datatype !== null) ? setSigmfDatatype(realCplx + datatype + "_" + leBe): null;
    }, [realCplx, leBe, datatype]);

    useEffect(() => {
        setGlobalData({...globalData, 'core:datatype': sigmfDatatype});
    }, [sigmfDatatype]);

    useEffect(() => {
        changeStateInput(globalData, sr, 'core:sample_rate', setGlobalData);
    }, [sr]);

    useEffect(() => {
        changeStateTextInput(globalData, author, 'core:author', setGlobalData);
    }, [author]);

    useEffect(() => {
        changeStateTextInput(globalData, collection, 'core:collection', setGlobalData);
    }, [collection]);

    useEffect(() => {
        changeStateTextInput(globalData, dataset, 'core:dataset', setGlobalData);
    }, [dataset]);

    useEffect(() => {
        changeStateTextInput(globalData, dataDoi, 'core:data_doi', setGlobalData);
    }, [dataDoi]);

    useEffect(() => {
        changeStateTextInput(globalData, desc, 'core:description', setGlobalData);
    }, [desc]);

    useEffect(() => {
        changeStateTextInput(globalData, hw, 'core:hw', setGlobalData);
    }, [hw]);

    useEffect(() => {
        changeStateTextInput(globalData, license, 'core:license', setGlobalData);
    }, [license]);

    useEffect(() => {
        changeStateInput(globalData, isMetaOnly, 'core:metadata_only', setGlobalData);
    }, [isMetaOnly]);

    useEffect(() => {
        changeStateTextInput(globalData, metaDoi, 'core:meta_doi', setGlobalData);
    }, [metaDoi]);

    useEffect(() => {
        changeStateInput(globalData, numChans, 'core:num_channels', setGlobalData);
    }, [numChans]);

    useEffect(() => {
        changeStateInput(globalData, offset, 'core:offset', setGlobalData);
    }, [offset]);

    useEffect(() => {
        changeStateTextInput(globalData, recorder, 'core:recorder', setGlobalData);
    }, [recorder]);

    useEffect(() => {
        changeStateTextInput(globalData, sha, 'core:sha512', setGlobalData);
    }, [sha]);

    useEffect(() => {
        changeStateInput(globalData, trailBytes, 'core:trailing_bytes', setGlobalData);
    }, [trailBytes]);

    useEffect(() => {
        changeStateTextInput(globalData, version, 'core:version', setGlobalData);
    }, [version]);

    useEffect(() => {
        changeStateInput(globalData, geo, 'core:geolocation', setGlobalData);
    }, [geo]);

    useEffect(() => {
        changeStateInput(globalData, trace, 'traceability', setGlobalData);
    }, [trace]);

    useEffect(() => {
        const retObj: SigMfGlobalType = {...globalData};
        if (Object.hasOwn(retObj, 'traceability')) {
            delete retObj.traceability;
            Object.keys(globalData.traceability || {}).forEach(key => {
                retObj[key] = globalData.traceability[key];
            });
        }
        transferData(retObj);
    }, [globalData])

    return (
        <div>
            <SigMfSelectInput label="Real or Complex?" id="real-cplx-input" required hidden={isHidden} changeFunction={setRealCplx} values={["r", "c"]}/>
            <SigMfSelectInput label="Little-endian or Big-endian?" id="le-be-input" required hidden={isHidden} changeFunction={setLeBe} values={["le", "be"]}/>
            <SigMfSelectInput label="Data Type" id="data-type-input" required hidden={isHidden} changeFunction={setDatatype} values={[
                "f32", "f64", "i32", "i16", "u32", "u16", "i8", "u8"
            ]} />
            <SigMfNumberInput label="Sample Rate" id="sample-rate-input" placeholder="0.0" changeFunction={setSr} hidden={isHidden} />
            <SigMfTextInput label="Author" id="author-input" placeholder="Enter author name" changeFunction={setAuthor} hidden={isHidden} />
            <SigMfTextInput label="Collection" id="collection-input" placeholder="collection" changeFunction={setCollection} hidden={isHidden} />
            <SigMfTextInput label="Dataset" id="dataset-input" placeholder="dataset" changeFunction={setDataset} hidden={isHidden} />
            <SigMfTextInput label="Data DOI" id="data-doi-input" placeholder="Data DOI" changeFunction={setDataDoi} hidden={isHidden} />
            <SigMfTextInput label="Description" id="description-input" placeholder="Description" changeFunction={setDesc} hidden={isHidden} />
            <SigMfTextInput label="Hardware" id="hw-input" placeholder="Hardware" changeFunction={setHw} hidden={isHidden} />
            <SigMfTextInput label="License" id="license-input" placeholder="license" changeFunction={setLicense} hidden={isHidden} />
            <SigMfCheckboxInput label="Metadata Only?" id="metadata-only-input" changeFunction={setIsMetaOnly} hidden={isHidden} />
            <SigMfTextInput label="Meta DOI" id="meta-doi-input" placeholder="meta doi" changeFunction={setMetaDoi} hidden={isHidden} />
            <SigMfNumberInput label="Number of Channels" id="num-channels-input" placeholder="0" changeFunction={setNumChans} hidden={isHidden} />
            <SigMfNumberInput label="Offset" id="offset-input" placeholder="0" changeFunction={setOffset} hidden={isHidden} />
            <SigMfTextInput label="Recorder" id="recorder-input" placeholder="recorder" changeFunction={setRecorder} hidden={isHidden} />
            <SigMfTextInput label="SHA512" id="sha-512-input" placeholder="SHA512 hash" changeFunction={setSha} hidden={isHidden} />
            <SigMfNumberInput label="Trailing Bytes" id="trail-bytes-input" placeholder="0" changeFunction={setTrailBytes} hidden={isHidden} />
            <SigMfTextInput label="Version" id="version-input" placeholder="0.0.0" required changeFunction={setVersion} hidden={isHidden} />
            <SigMfGeoInput idPart="global" isHidden={isHidden} changeFunction={setGeo} />
            <TraceabilityGlobal isHidden={isHidden} changeFunction={setTrace} />
            {/*<h4 hidden={isHidden}>Extensions</h4>*/}
        </div>
    );
}