'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput";
import SigMfCheckboxInput from "./Inputs/SigMfCheckboxInput";
import SigMfGeoInput from "./SigMfGeoInput";
import { SigMfAntennaGlobalType, SigMfGeoType, SigMfGlobalType, SigMfSpatialGlobalType, SigMfTraceabilityGlobalType } from "./SigMfInterfaces";
import SigMfSelectInput from "./Inputs/SigMfSelectInput";
import { changeStateInput, cleanObject } from "./SigMfFunctions";
import { TraceabilityGlobal } from "./Extensions/Traceability";
import { AntennaGlobal } from "./Extensions/Antenna";
import { SpatialGlobal } from "./Extensions/Spatial";

export default function SigMfGlobal( { isHidden, transferData }: {isHidden: boolean, transferData: Function} ) {

    const [realCplx, setRealCplx] = useState<string>("");
    const [leBe, setLeBe] = useState<string>("");
    const [datatype, setDatatype] = useState<string>("");
    const [sigmfDatatype, setSigmfDatatype] = useState<string>("");
    const [sr, setSr] = useState<number|string>("");
    const [author, setAuthor] = useState<string>("");
    const [collection, setCollection] = useState<string>("");
    const [dataset, setDataset] = useState<string>("");
    const [dataDoi, setDataDoi] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [hw, setHw] = useState<string>("");
    const [license, setLicense] = useState<string>("'");
    const [isMetaOnly, setIsMetaOnly] = useState<boolean>(false);
    const [metaDoi, setMetaDoi] = useState<string>("");
    const [numChans, setNumChans] = useState<integer|string>("");
    const [offset, setOffset] = useState<integer|string>("");
    const [recorder, setRecorder] = useState<string>("");
    const [sha, setSha] = useState<string>("");
    const [trailBytes, setTrailBytes] = useState<integer|string>("");
    const [version, setVersion] = useState<string>("");
    const [geo, setGeo] = useState<SigMfGeoType|object>({});
    const [trace, setTrace] = useState<SigMfTraceabilityGlobalType|object>({});
    const [ant, setAnt] = useState<SigMfAntennaGlobalType|object>({});
    const [space, setSpace] = useState<SigMfSpatialGlobalType|object>({});

    const [globalData, setGlobalData] = useState<SigMfGlobalType>({
        'core:datatype': "",
        'core:metadata_only': isMetaOnly,
        'core:version': ""
    });

    useEffect(() => {
        (realCplx !== "" && datatype !== "" && leBe !== "") ? setSigmfDatatype(realCplx + datatype + "_" + leBe): setSigmfDatatype("");
    }, [realCplx, leBe, datatype]);

    useEffect(() => {
        setGlobalData({...globalData, 'core:datatype': sigmfDatatype});
    }, [sigmfDatatype]);

    useEffect(() => {
        changeStateInput(globalData, sr, 'core:sample_rate', setGlobalData);
    }, [sr]);

    useEffect(() => {
        changeStateInput(globalData, author, 'core:author', setGlobalData);
    }, [author]);

    useEffect(() => {
        changeStateInput(globalData, collection, 'core:collection', setGlobalData);
    }, [collection]);

    useEffect(() => {
        changeStateInput(globalData, dataset, 'core:dataset', setGlobalData);
    }, [dataset]);

    useEffect(() => {
        changeStateInput(globalData, dataDoi, 'core:data_doi', setGlobalData);
    }, [dataDoi]);

    useEffect(() => {
        changeStateInput(globalData, desc, 'core:description', setGlobalData);
    }, [desc]);

    useEffect(() => {
        changeStateInput(globalData, hw, 'core:hw', setGlobalData);
    }, [hw]);

    useEffect(() => {
        changeStateInput(globalData, license, 'core:license', setGlobalData);
    }, [license]);

    useEffect(() => {
        changeStateInput(globalData, isMetaOnly, 'core:metadata_only', setGlobalData);
    }, [isMetaOnly]);

    useEffect(() => {
        changeStateInput(globalData, metaDoi, 'core:meta_doi', setGlobalData);
    }, [metaDoi]);

    useEffect(() => {
        changeStateInput(globalData, numChans, 'core:num_channels', setGlobalData);
    }, [numChans]);

    useEffect(() => {
        changeStateInput(globalData, offset, 'core:offset', setGlobalData);
    }, [offset]);

    useEffect(() => {
        changeStateInput(globalData, recorder, 'core:recorder', setGlobalData);
    }, [recorder]);

    useEffect(() => {
        changeStateInput(globalData, sha, 'core:sha512', setGlobalData);
    }, [sha]);

    useEffect(() => {
        changeStateInput(globalData, trailBytes, 'core:trailing_bytes', setGlobalData);
    }, [trailBytes]);

    useEffect(() => {
        changeStateInput(globalData, version, 'core:version', setGlobalData);
    }, [version]);

    useEffect(() => {
        changeStateInput(globalData, geo, 'core:geolocation', setGlobalData);
    }, [geo]);

    useEffect(() => {
        changeStateInput(globalData, trace, 'traceability', setGlobalData);
    }, [trace]);

    useEffect(() => {
        changeStateInput(globalData, ant, 'antenna', setGlobalData);
    }, [ant]);

    useEffect(() => {
        changeStateInput(globalData, space, 'spatial', setGlobalData);
    }, [space]);

    useEffect(() => {
        const tmpObj: object = cleanObject(globalData);
        const retObj: object = {};
        if (Object.hasOwn(tmpObj, 'core:version') && Object.hasOwn(tmpObj, 'core:datatype')) {
            for (const key in tmpObj) {
                switch(key) {
                    case 'traceability':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    case 'antenna':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    case 'spatial':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    default:
                        retObj[key as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj];
                }
            }
        }
        transferData(retObj);
    }, [globalData])

    return (
        <div className="mx-auto">
            <SigMfSelectInput label="Real or Complex?" id="real-cplx-input" required hidden={isHidden} changeFunction={setRealCplx} values={["r", "c"]}/>
            <SigMfSelectInput label="Little-endian or Big-endian?" id="le-be-input" required hidden={isHidden} changeFunction={setLeBe} values={["le", "be"]}/>
            <SigMfSelectInput label="Data Type" id="data-type-input" required hidden={isHidden} changeFunction={setDatatype} values={[
                "f32", "f64", "i32", "i16", "u32", "u16", "i8", "u8"
            ]} />
            <SigMfNumberInput label="Sample Rate" id="sample_rate-input" placeholder="0.0" changeFunction={setSr} hidden={isHidden} />
            <SigMfTextInput label="Author" id="author-input" placeholder="Enter author name" changeFunction={setAuthor} hidden={isHidden} />
            <SigMfTextInput label="Collection" id="collection-input" placeholder="collection" changeFunction={setCollection} hidden={isHidden} />
            <SigMfTextInput label="Dataset" id="dataset-input" placeholder="dataset" changeFunction={setDataset} hidden={isHidden} />
            <SigMfTextInput label="Data DOI" id="data_doi-input" placeholder="Data DOI" changeFunction={setDataDoi} hidden={isHidden} />
            <SigMfTextInput label="Description" id="description-input" placeholder="Description" changeFunction={setDesc} hidden={isHidden} />
            <SigMfTextInput label="Hardware" id="hw-input" placeholder="Hardware" changeFunction={setHw} hidden={isHidden} />
            <SigMfTextInput label="License" id="license-input" placeholder="license" changeFunction={setLicense} hidden={isHidden} />
            <SigMfCheckboxInput label="Metadata Only?" id="metadata_only-input" changeFunction={setIsMetaOnly} hidden={isHidden} />
            <SigMfTextInput label="Meta DOI" id="meta_doi-input" placeholder="meta doi" changeFunction={setMetaDoi} hidden={isHidden} />
            <SigMfNumberInput label="Number of Channels" id="num_channels-input" placeholder="0" changeFunction={setNumChans} hidden={isHidden} />
            <SigMfNumberInput label="Offset" id="offset-input" placeholder="0" changeFunction={setOffset} hidden={isHidden} />
            <SigMfTextInput label="Recorder" id="recorder-input" placeholder="recorder" changeFunction={setRecorder} hidden={isHidden} />
            <SigMfTextInput label="SHA512" id="sha512-input" placeholder="SHA512 hash" changeFunction={setSha} hidden={isHidden} />
            <SigMfNumberInput label="Trailing Bytes" id="trailing_bytes-input" placeholder="0" changeFunction={setTrailBytes} hidden={isHidden} />
            <SigMfTextInput label="Version" id="version-input" placeholder="0.0.0" required changeFunction={setVersion} hidden={isHidden} />
            <SigMfGeoInput idPart="global" isHidden={isHidden} changeFunction={setGeo} />
            <TraceabilityGlobal isHidden={isHidden} changeFunction={setTrace} />
            <AntennaGlobal isHidden={isHidden} changeFunction={setAnt} />
            <SpatialGlobal isHidden={isHidden} changeFunction={setSpace} idPart=""/>
        </div>
    );
}