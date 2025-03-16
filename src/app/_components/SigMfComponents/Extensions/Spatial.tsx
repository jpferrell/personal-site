'use client'

import { useEffect, useState } from "react"
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import { SigMfBearingType, SigMfCalibrationType, SigMfCartesianPointType, SigMfGeoType, SigMfSpatialAnnotationType, SigMfSpatialCaptureType, SigMfSpatialGlobalType } from "../SigMfInterfaces";
import SigMfNumberInput from "../Inputs/SigMfNumberInput";
import SigMfBearingInput from "../Inputs/SigMfBearingInput";
import { changeStateInput } from "../SigMfFunctions";
import SigMfGeoInput from "../SigMfGeoInput";
import SigMfCalibrationInput from "../Inputs/SigMfCalibrationInput";
import { cleanObject } from "../SigMfFunctions";

export function SpatialGlobal( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [numEl, setNumEl] = useState<number|string>("");
    const [chanIdx, setChanIdx] = useState<number|string>("");

    const [spatial, setSpatial] = useState<SigMfSpatialGlobalType>({
        enabled: false,
        'spatial:num_elements': "",
        'spatial:channel_index': ""
    });

    useEffect(() => {
        setSpatial({...spatial, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        setSpatial({...spatial, 'spatial:num_elements': numEl});
    }, [numEl]);

    useEffect(() => {
        setSpatial({...spatial, 'spatial:channel_index': chanIdx});
    }, [chanIdx]);

    useEffect(() => {
       if (spatial.enabled) {
        const tmpObj: SigMfSpatialGlobalType = {...spatial};
        delete tmpObj.enabled;
        const retObj: object = cleanObject(tmpObj);
        if (
            Object.hasOwn(retObj, 'spatial:num_elements') &&
            Object.hasOwn(retObj, 'spatial:channel_index')
        ) {
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
       } else {
        changeFunction("");
       }
    }, [spatial]);

    return (
        <div id="spatial-global-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Spatial" id="spatial-global-enabled-input" changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput id={`${idPart}spatial-global-num_elements-input`} label="Number Elements" hidden={isHidden || !isEnabled} changeFunction={setNumEl} required />
            <SigMfNumberInput id={`${idPart}spatial-global-channel_index-input`} label="Channel Index" hidden={isHidden || !isEnabled} changeFunction={setChanIdx} required />
        </div>
    );
}

export function SpatialCapture( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [apAz, setApAz] = useState<number|string>("");
    const [apBear, setApBear] = useState<SigMfBearingType|object>({});
    const [apRot, setApRot] = useState<number|string>("");
    const [emitBear, setEmitBear] = useState<SigMfBearingType|object>({});
    const [elGeo, ] = useState<SigMfCartesianPointType[]|object>({});
    const [phaseOff, setPhaseOff] = useState<number|string>("");
    const [cal, setCal] = useState<SigMfCalibrationType|object>({});

    const [space, setSpace] = useState<SigMfSpatialCaptureType>({
        enabled: false
    });

    useEffect(() => {
        setSpace({...space, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(space, apAz, 'spatial:aperture_azimuth', setSpace);
    }, [apAz]);

    useEffect(() => {
        changeStateInput(space, apBear, 'spatial:aperture_bearing', setSpace);
    }, [apBear]);

    useEffect(() => {
        changeStateInput(space, apRot, 'spatial:aperture_rotation', setSpace);
    }, [apRot]);

    useEffect(() => {
        changeStateInput(space, emitBear, 'spatial:emitter_bearing', setSpace);
    }, [emitBear]);

    useEffect(() => {
        changeStateInput(space, elGeo, 'spatial:element_geometry', setSpace);
    }, [elGeo]);

    useEffect(() => {
        changeStateInput(space, phaseOff, 'spatial:phase_offset', setSpace);
    }, [phaseOff]);

    useEffect(() => {
        changeStateInput(space, cal, 'spatial:calibration', setSpace);
    }, [cal]);

    useEffect(() => {
        if (space.enabled) {
            const tmpObj: SigMfSpatialCaptureType = {...space};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
    }, [space])

    return (
        <div id="spatial-annotation-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Spatial" id={`${idPart}-spatial-cap-enable-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput label="Aperture Azimuth (deg)" id={`${idPart}-spatial-cap-aperture-az-input`} changeFunction={setApAz} hidden={isHidden || !isEnabled} />
            <SigMfBearingInput labelPart="Aperture Bearing" idPart={`${idPart}-spatial-cap-aperture`} changeFunction={setApBear} isHidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Aperture Rotation (deg)" id={`${idPart}-spatial-cap-aperture-rot-input`} changeFunction={setApRot} hidden={isHidden || !isEnabled} />
            <SigMfBearingInput labelPart="Emitter Bearing" idPart={`${idPart}-spatial-cap-emitter`} changeFunction={setEmitBear} isHidden={isHidden || !isEnabled} />
            {/** TODO: Add in the element geometry input somehow */}
            <SigMfNumberInput label="Phase Offset (deg)" id={`${idPart}-spatial-cap-phase-offset-input`} changeFunction={setPhaseOff} hidden={isHidden || !isEnabled} />
            <SigMfCalibrationInput idPart={`${idPart}`} labelPart="Spatial" isHidden={isHidden || !isEnabled} changeFunction={setCal} />
        </div>
    );
}

export function SpatialAnnotation( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [az, setAz] = useState<number|string>("");
    const [bearing, setBearing] = useState<SigMfBearingType|object>({});
    const [loc, setLoc] = useState<SigMfGeoType|object>({});

    const [space, setSpace] = useState<SigMfSpatialAnnotationType>({
        enabled: false
    });

    useEffect(() => {
        setSpace({...space, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(space, az, 'spatial:signal_azimuth', setSpace);
    }, [az]);

    useEffect(() => {
        changeStateInput(space, bearing, 'spatial:bearing', setSpace);
    }, [bearing]);

    useEffect(() => {
        changeStateInput(space, loc, 'spatial:emitter_location', setSpace);
    }, [loc]);

    useEffect(() => {
        if (space.enabled) {
            const tmpObj: SigMfSpatialAnnotationType = {...space};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
    }, [space]);

    return (
        <div id="spatial-annotation-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Spatial" id={`${idPart}-spatial-annot-enable-input`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput label="Signal Azimuth (deg)" id={`${idPart}-spatial-annot-signal-az-input`} changeFunction={setAz} hidden={isHidden || !isEnabled} />
            <SigMfBearingInput labelPart="Signal" idPart={`${idPart}-spatial-annot`} changeFunction={setBearing} isHidden={isHidden || !isEnabled} />
            <SigMfGeoInput idPart={`${idPart}-spatial-annot-emmiter-location`} changeFunction={setLoc} isHidden={isHidden || !isEnabled} />
        </div>
    );
}