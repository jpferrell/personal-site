import { useState } from "react";
import SigMfInput from "../../SigMfInput";

export function CaptureDetailsCaptures() {

    const [isCapEnabled, setIsCapEnabled] = useState(false);

    return (
        <div>
            <SigMfInput label="Capture Details" id="cap-cap-dets-enabled-input" type="checkbox" changeFuction={setIsCapEnabled} />
            <SigMfInput label="Acquisition Scale Factor" id="cap-cap-dets-acq-scale-factor-input" type="number" placeholder="0.0" hidden={!isCapEnabled} required />
            <SigMfInput label="Attenuation" id="cap-cap-dets-attn-input" type="number" placeholder="0.0" hidden={!isCapEnabled} required />
            <SigMfInput label="Acquisition Bandwidth" id="cap-cap-dets-acq-bw-input" type="number" placeholder="0.0" hidden={!isCapEnabled} required />
            <SigMfInput label="Start Capture" id="cap-cap-dets-start-cap-input" type="text" placeholder="yyyy-mm-ddTHH:MM:SSZ" hidden={!isCapEnabled} required />
            <SigMfInput label="Stop Capture" id="cap-cap-dets-stop-cap-input" type="text" placeholder="yyyy-mm-ddTHH:MM:SSZ" hidden={!isCapEnabled} required />
            <SigMfInput label="Source File" id="cap-cap-dets-src-file-input" type="text" placeholder="file" hidden={!isCapEnabled} required />
            <SigMfInput label="Gain" id="cap-cap-dets-gain-input" type="number" placeholder="0.0" hidden={!isCapEnabled} />
        </div>
    );
}

export function CaptureDetailsAnnotations() {

    const [isCapEnabled, setIsCapEnabled] = useState(false);

    return (
        <div>
            <SigMfInput label="Capture Details" id="annot-cap-dets-enabled-input" type="checkbox" changeFuction={setIsCapEnabled} />
            <SigMfInput label="SNR (dB)" id="annot-cap-dets-snr-db-input" type="number" placeholder="0.0" hidden={!isCapEnabled} required />
            <SigMfInput label="Signal Reference Number" id="annot-cap-dets-sig-ref-num" type="text" placeholder="number" hidden={!isCapEnabled} required />
        </div>
    );
}