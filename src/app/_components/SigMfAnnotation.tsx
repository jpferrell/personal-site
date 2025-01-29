import SigMfGeoInput from "./SigMfGeoInput";
import SigMfInput from "./SigMfInput";
import { CaptureDetailsAnnotations } from "./SigMfComponents/Extensions/CaptureDetails";

export default function SigMfAnnotation() {

    return (
        <div>
            <SigMfInput label="Sample Start" id="annot-sample-start-input" type="number" placeholder="0" required />
            <SigMfInput label="Sample Count" id="annot-sample-cnt-input" type="number" placeholder="0" />
            <SigMfInput label="Frequency Lower Edge" id="annot-freq-lower-edge-input" type="number" placeholder="0.0" />
            <SigMfInput label="Frequency Upper Edge" id="annot-freq-upper-edge-input" type="number" placeholder="0.0" />
            <SigMfInput label="Label" id="annot-label-input" type="text" placeholder="label" />
            <SigMfInput label="Comment" id="annot-comment-input" type="text" placeholder="comment" />
            <SigMfInput label="Generator" id="annot-generator-input" type="text" placeholder="generator" />
            <SigMfInput label="UUID" id="annot-uuid-input" type="text" placeholder="uuid" />
            <SigMfGeoInput idPart="annot" />
            <CaptureDetailsAnnotations />
            <button id="add-annot-button" className="rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500">Add Annotation</button>
        </div>
    );
}