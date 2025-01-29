import { SigMfInputProps } from "@/app/_components/SigMfInput";
import SigMfInput from "@/app/_components/SigMfInput";

export default function SigMFEditor() {
    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-2xl"><strong>SigMF Editor</strong></h1>
            <div className="grid grid-cols-2 pt-4">
                <div className="grid grid-cols-1 gap-2">
                    <h2>Editor</h2>
                    <h3>Global</h3>
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
                    <h4>Geolocation</h4>
                    <SigMfInput label="Type" id="global-geo-type-input" type="text" placeholder="Point" />
                    <SigMfInput label="Latitude" id="global-geo-lat-input" type="number" placeholder="0.0" />
                    <SigMfInput label="Longitude" id="global-geo-lon-input" type="number" placeholder="0.0" />
                    <SigMfInput label="Altitude" id="global-geo-alt-input" type="number" placeholder="0.0" />
                    <h4>Extensions</h4>
                    <button className="rounded block bg-slate-300 dark:bg-slate-300 hover:slate-700 dark:hover:bg-slate-500 text-indigo-500">Create</button>
                </div>
                <div className="grid grid-cols-2">
                    <h2>Captures</h2>
                    <h2>Annotations</h2>
                </div>
            </div>
        </div>

    );
}