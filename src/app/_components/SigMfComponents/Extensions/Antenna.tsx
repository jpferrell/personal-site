'use client'

import { useEffect, useState } from "react";
import { SigMfAntennaAnnotationType, SigMfAntennaGlobalType } from "../SigMfInterfaces";
import SigMfTextInput from "../Inputs/SigMfTextInput";
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import SigMfNumberInput from "../Inputs/SigMfNumberInput";
import { changeStateInput, cleanObject } from "../SigMfFunctions";

type ChangeFunction = (a: object) => void;

export function AntennaGlobal({ isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function })
{

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [model, setModel] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [lowFreq, setLowFreq] = useState<number|string>("");
    const [highFreq, setHighFreq] = useState<number|string>("");
    const [gain, setGain] = useState<number|string>("");
    //const [hGainPattern, setHGainPattern] = useState<number[]>([]);
    //const [vGainPattern, setVGainPattern] = useState<number[]>([]);
    const [hBeamWidth, setHBeamWidth] = useState<number|string>("");
    const [vBeamWidth, setVBeamWidth] = useState<number|string>("");
    const [xPolar, setXPolar] = useState<number|string>("");
    const [vswr, setVswr] = useState<number|string>("");
    const [cableLoss, setCableLoss] = useState<number|string>("");
    const [isSteerable, setIsSteerable] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [hagl, setHagl] = useState<number|string>("");

    const [antData, setAntData] = useState<SigMfAntennaGlobalType>({
        enabled: false,
        'antenna:model': ""
    });

    useEffect(() => {
        setAntData({...antData, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, model, 'antenna:model', setAntData);
    }, [model]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, type, 'antenna:type', setAntData);
    }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, lowFreq, 'antenna:low_frequency', setAntData);
    }, [lowFreq]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, highFreq, 'antenna:high_frequency', setAntData);
    }, [highFreq]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, gain, 'antenna:gain', setAntData);
    }, [gain]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, hBeamWidth, 'antenna:horizontal_beam_width', setAntData);
    }, [hBeamWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, vBeamWidth, 'antenna:vertical_beam_width', setAntData);
    }, [vBeamWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, xPolar, 'antenna:cross_polar_discrimination', setAntData);
    }, [xPolar]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, vswr, 'antenna:voltage_standing_wave_ratio', setAntData);
    }, [vswr]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, cableLoss, 'antenna:cable_loss', setAntData);
    }, [cableLoss]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, isSteerable, 'antenna:steerable', setAntData);
    }, [isSteerable]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, isMobile, 'antenna:mobile', setAntData);
    }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, hagl, 'antenna:hagl', setAntData);
    }, [hagl]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (antData.enabled) {
            const tmpObj: SigMfAntennaGlobalType = {...antData};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            if (Object.hasOwn(retObj, 'antenna:model')) {
                changeFunction(retObj);
            } else {
                changeFunction({});
            }
        } else {
            changeFunction({});
        }
    }, [antData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="antenna-global-container" className="border-double rounded-lg border-4 border-slate-200 dark:bg-zinc-700 mb-2" hidden={isHidden}>
            <SigMfCheckboxInput label="Antenna" id="antenna-global-enabled-input" hidden={isHidden} changeFunction={setIsEnabled} />
            <SigMfTextInput label="Model" id="antenna-global-model-input" placeholder="Antenna make and model number" hidden={isHidden || !isEnabled} required changeFunction={setModel} />
            <SigMfTextInput label="Type" id="antenna-global-type-input" placeholder="Antenna type" changeFunction={setType} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Low Frequency" id="antenna-global-low_frequency-input" placeholder="0.0" changeFunction={setLowFreq} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="High Frequency" id="antenna-global-high_frequency-input" placeholder="0.0" changeFunction={setHighFreq} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Gain" id="antenna-global-gain-input" placeholder="0.0" changeFunction={setGain} hidden={isHidden || !isEnabled} />
            {/** TODO: do the gain pattern array inputs */}
            <SigMfNumberInput label="Horizontal Beam Width" id="antenna-global-horizontal_beam_width-input" placeholder="0.0" changeFunction={setHBeamWidth} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Vertical Beam Width" id="antenna-global-vertical_beam_width-input" placeholder="0.0" changeFunction={setVBeamWidth} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Cross Polar Discrimination" id="antenna-global-cross_polar_discrimination-input" placeholder="0.0" changeFunction={setXPolar} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Voltage Standing Wave Ratio" id="antenna-global-voltage_standing_wave_ratio-input" placeholder="0.0" changeFunction={setVswr}  hidden={isHidden || !isEnabled}/>
            <SigMfNumberInput label="Cable Loss" id="antenna-global-cable_loss-input" placeholder="0.0" changeFunction={setCableLoss} hidden={isHidden || !isEnabled}/>
            <SigMfCheckboxInput label="Steerable" id="antenna-global-steerable-input" changeFunction={setIsSteerable} hidden={isHidden || !isEnabled}/>
            <SigMfCheckboxInput label="Mobile" id="antenna-global-mobile-input" changeFunction={setIsMobile} hidden={isHidden || !isEnabled}/>
            <SigMfNumberInput label="Height Above Ground Level (m)" id="antenna-global-hagl-input" placeholder="0.0" changeFunction={setHagl} hidden={isHidden || !isEnabled}/>
        </div>
    );
}

export function AntennaAnnotation({ isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function })
{
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [azAngle, setAzAngle] = useState<number|string>("");
    const [elAngle, setElAngle] = useState<number|string>("");
    const [polar, setPolar] = useState<string>("");

    const [antData, setAntData] = useState<SigMfAntennaAnnotationType>({
        enabled: false
    });

    useEffect(() => {
        setAntData({...antData, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, azAngle, 'antenna:azimuth_angle', setAntData);
    }, [azAngle]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, elAngle, 'antenna:elevation_angle', setAntData);
    }, [elAngle]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(antData, polar, 'antenna:polarization', setAntData);
    }, [polar]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (antData.enabled) {
            const tmpObj: SigMfAntennaAnnotationType = {...antData};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
    }, [antData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="antenna-annotation-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Antenna" id="antenna-annot-enabled-input" changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput label="Azimuth Angle" id="antenna-annot-az-angle-input" placeholder="0.0" changeFunction={setAzAngle} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput label="Elevation Angle" id="antenna-annot-el-angle-input" placeholder="0.0" changeFunction={setElAngle} hidden={isHidden || !isEnabled} />
            <SigMfTextInput label="Polarization" id="antenna-annot-polarization-input" placeholder="e.g. Vertical" changeFunction={setPolar} hidden={isHidden || !isEnabled} />
        </div>
    );
}