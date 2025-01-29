import SigMfInput from "@/app/_components/SigMfInput";
import SigMfGeoInput from "./SigMfGeoInput";

export default function SigMfGlobal() {

    return (
        <div>
            <SigMfInput label="Sample Rate" id="sample-rate-input" type="number" placeholder="0.0" />
            <SigMfInput label="Author" id="author-input" type="text" placeholder="Enter author name" />
            <SigMfInput label="Collection" id="collection-input" type="text" placeholder="collection" />
            <SigMfInput label="Dataset" id="dataset-input" type="text" placeholder="dataset" />
            <SigMfInput label="Data DOI" id="data-doi-input" type="text" placeholder="data DOI" />
            <SigMfInput label="Description" id="description-input" type="text" placeholder="Description" />
            <SigMfInput label="Hardware" id="hw-input" type="text" placeholder="Hardware" />
            <SigMfInput label="License" id="license-input" type="text" placeholder="license" />
            <SigMfInput label="Metadata Only?" id="metadata-only-input" type="checkbox" />
            <SigMfInput label="Meta DOI" id="meta-doi-input" type="text" placeholder="meta doi" />
            <SigMfInput label="Number of Channels" id="num-channels-input" type="number" placeholder="1" />
            <SigMfInput label="Offset" id="offset-input" type="number" placeholder="0" />
            <SigMfInput label="Recorder" id="recorder-input" type="text" placeholder="recorder" />
            <SigMfInput label="SHA512" id="sha-512-input" type="text" placeholder="SHA512 hash" />
            <SigMfInput label="Trailing Bytes" id="trail-bytes-input" type="number" placeholder="0" />
            <SigMfInput label="Version" id="version-input" type="text" placeholder="0.0.0" required />
            <SigMfGeoInput idPart="global" />
            <h4>Extensions</h4>
        </div>
    );
}