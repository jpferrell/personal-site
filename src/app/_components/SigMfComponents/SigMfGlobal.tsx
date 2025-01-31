'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput";
import SigMfCheckboxInput from "./Inputs/SigMfCheckboxInput";
import SigMfGeoInput from "./SigMfGeoInput";
import { SigMfGeoType } from "./SigMfInterfaces";

export default function SigMfGlobal( {isHidden}: {isHidden: boolean} ) {

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

    useEffect(() => {
        console.log("Sample rate: " + sr);
    }, [sr]);

    return (
        <div>
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