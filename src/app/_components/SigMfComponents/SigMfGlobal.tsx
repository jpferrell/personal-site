'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput";
import SigMfCheckboxInput from "./Inputs/SigMfCheckboxInput";
import SigMfGeoInput from "./SigMfGeoInput";
import { SigMfGeoType, SigMfGlobalType } from "./SigMfInterfaces";
import SigMfSelectInput from "./Inputs/SigMfSelectInput";

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

    const [globalData, setGlobalData] = useState<SigMfGlobalType>({
        'core:datatype': null,
        'core:sample_rate': null,
        'core:author': null,
        'core:collection': null,
        'core:dataset': null,
        'core:data_doi': null,
        'core:description': null,
        'core:hw': null,
        'core:license': null,
        'core:metadata_only': isMetaOnly,
        'core:meta_doi': null,
        'core:num_channels': null,
        'core:offset': null,
        'core:recorder': null,
        'core:sha512': null,
        'core:trailing_bytes': null,
        'core:version': null,
        'core:geolocation': null
    });

    useEffect(() => {
        (realCplx !== null && datatype !== null) ? setSigmfDatatype(realCplx + datatype + "_" + leBe): null;
    }, [realCplx, leBe, datatype]);

    useEffect(() => {
        setGlobalData({
            'core:datatype': sigmfDatatype,
            'core:sample_rate': sr,
            'core:author': author,
            'core:collection': collection,
            'core:dataset': dataset,
            'core:data_doi': dataDoi,
            'core:description': desc,
            'core:hw': hw,
            'core:license': license,
            'core:metadata_only': isMetaOnly,
            'core:meta_doi': metaDoi,
            'core:num_channels': numChans,
            'core:offset': offset,
            'core:recorder': recorder,
            'core:sha512': sha,
            'core:trailing_bytes': trailBytes,
            'core:version': version,
            'core:geolocation': geo
        })
    }, [sigmfDatatype, sr, author, collection, dataset, dataDoi, desc, hw, license, isMetaOnly, metaDoi, numChans, offset, recorder, sha, trailBytes, version, geo]);

    function verifyData(obj: SigMfGlobalType) {

    }

    function cleanData(dirtyData: SigMfGlobalType) {
        const retObj = {};
       for (const [key, value] of Object.entries(dirtyData)) {
        if (value !== null) {
            retObj[key] = value;
        }
       }
        return retObj;
    }

    useEffect(() => {
        const retData = cleanData(globalData);
        transferData(retData);
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
            {/*<h4 hidden={isHidden}>Extensions</h4>*/}
        </div>
    );
}