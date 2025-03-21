'use client'

import { useEffect, useState } from "react"
import { SigMfBearingType, SigMfCalibrationType, SigMfCartesianPointType } from "../SigMfInterfaces";
import { changeStateInput, cleanObject } from "../SigMfFunctions";
import SigMfBearingInput from "./SigMfBearingInput";
import SigMfCartesianPoint from "./SigMfCartesianPointInput";
import SigMfSelectInput from "./SigMfSelectInput";
import SigMfCheckboxInput from "./SigMfCheckboxInput";

type ChangeFunction = (a: object|string) => void;

export default function SigMfCalibrationInput ( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function })
{
    const calTypes: string[] = ["tone", "xcorr", "ref", "other"];

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [calType, setCalType] = useState<string>("");
    const [bearing, setBearing] = useState<SigMfBearingType|object>({});
    const [calGeo, setCalGeo] = useState<SigMfCartesianPointType|object>({});

    const [cal, setCal] = useState<SigMfCalibrationType>({
        enabled: false,
        caltype: ""
    });

    useEffect(() => {
        setCal({...cal, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setCal({...cal, caltype: calType});
    }, [calType]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(cal, bearing, 'bearing', setCal);
    }, [bearing]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(cal, calGeo, 'cal_geometry', setCal);
    }, [calGeo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (cal.enabled) {
            const tmpObj: SigMfCalibrationType = {...cal};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            if (Object.hasOwn(retObj, 'caltype')) {
                changeFunction(retObj);
            } else {
                changeFunction({});
            }
        } else {
            changeFunction({});
        }
    }, [cal]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="border-dotted border-2 rounded-lg m-2 border-slate-200" id={`${idPart}-calibration-input-container`} hidden={isHidden}>
            <SigMfCheckboxInput id={`${idPart}-calibration-enabled-input`} label={`${labelPart} Calibration`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfSelectInput id={`${idPart}-calibration-cal-type`} label="Calibration Type" hidden={isHidden || !isEnabled} values={calTypes} changeFunction={setCalType} required />
            <SigMfBearingInput idPart={`${idPart}-calibration`} labelPart={`${labelPart}`} isHidden={isHidden || !isEnabled} changeFunction={setBearing} />
            <SigMfCartesianPoint idPart={`${idPart}-calibration`} labelPart={`${labelPart}`} changeFunction={setCalGeo} isHidden={isHidden || !isEnabled} />
        </div>
    );
}