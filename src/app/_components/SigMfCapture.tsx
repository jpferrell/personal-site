import SigMfInput from "./SigMfInput";
import { CaptureDetailsCaptures } from "./SigMfComponents/Extensions/CaptureDetails";

export default function SigMfCapture() {

    return (
        <div>
            <SigMfInput label="Sample Start" id="capt-sample-start-input" type="number" placeholder="0" required />
            <SigMfInput label="Datetime" id="capt-datetime-input" type="date" placeholder="01/01/2000" />
            <SigMfInput label="Frequency" id="capt-freq-input" type="number" placeholder="0.0" />
            <SigMfInput label="Global Index" id="capt-global-idx-input" type="number" placeholder="0" />
            <SigMfInput label="Header Bytes" id="capt-head-bytes-input" type="number" placeholder="0" />
            <CaptureDetailsCaptures />
        </div>
    );
}