import { useEffect, useState } from 'react';
import SigMfTextInput from './SigMfTextInput'
import { SigMfOriginType } from '../SigMfInterfaces';
import { changeStateInput, cleanObject } from '../SigMfFunctions';
import SigMfCheckboxInput from './SigMfCheckboxInput';

type ChangeFunction = (a: object|string) => void;

export default function SigMfOriginInput( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function } ) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [account, setAccount] = useState<string>("");
    const [container, setContainer] = useState<string>("");
    const [filePath, setFilePath] = useState<string>("");

    const [originData, setOriginData] = useState<SigMfOriginType>({
        enabled: false,
        file_path: null
    });

    useEffect(() => {
        setOriginData({...originData, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(originData, account, 'account', setOriginData);
    }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(originData, container, 'container', setOriginData);
    }, [container]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setOriginData({...originData, file_path: filePath});
    }, [filePath]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
       if (originData.enabled) {
        const tmpObj: SigMfOriginType = {...originData};
        delete tmpObj.enabled;
        const retObj: object = cleanObject(tmpObj);
        changeFunction(retObj);
       } else {
        changeFunction({});
       }
    }, [originData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id={`${idPart}-origin-container`} hidden={isHidden} className='border-dotted border-2 rounded-lg m-2'>
            <SigMfCheckboxInput label={`${labelPart}`} id={`${idPart}-origin-enabled-input`} changeFunction={setIsEnabled} />
            <SigMfTextInput label={`${labelPart} Account`} id={`${idPart}-origin-account-input`} hidden={isHidden || !isEnabled} changeFunction={setAccount} placeholder='Account name or identifier' />
            <SigMfTextInput label={`${labelPart} Container`} id={`${idPart}-origin-container-input`} hidden={isHidden || !isEnabled} placeholder='Container or repository name' changeFunction={setContainer} />
            <SigMfTextInput label={`${labelPart} File Path`} id={`${idPart}-origin-filepath-input`} hidden={isHidden || !isEnabled} placeholder='Path to the file within the container' changeFunction={setFilePath} required/>
        </div>
    );
}