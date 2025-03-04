import { useEffect, useState } from 'react';
import SigMfTextInput from './SigMfTextInput'
import { SigMfOriginType } from '../SigMfInterfaces';
import { changeStateInput, cleanObject } from '../SigMfFunctions';
import SigMfCheckboxInput from './SigMfCheckboxInput';

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
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(originData, account, 'account', setOriginData);
    }, [account]);

    useEffect(() => {
        changeStateInput(originData, container, 'container', setOriginData);
    }, [container]);

    useEffect(() => {
        setOriginData({...originData, file_path: filePath});
    }, [filePath]);

    useEffect(() => {
       if (originData.enabled) {
        const tmpObj: SigMfOriginType = {...originData};
        delete tmpObj.enabled;
        const retObj: object = cleanObject(tmpObj);
        changeFunction(retObj);
       } else {
        changeFunction({});
       }
    }, [originData]);

    return (
        <div id={`${idPart}-origin-container`} hidden={isHidden} className='border-dotted border-2 rounded-lg m-2'>
            <SigMfCheckboxInput label={`${labelPart}`} id={`${idPart}-origin-enabled-input`} changeFunction={setIsEnabled} />
            <SigMfTextInput label={`${labelPart} Account`} id={`${idPart}-origin-account-input`} hidden={isHidden || !isEnabled} changeFunction={setAccount} placeholder='Account name or identifier' />
            <SigMfTextInput label={`${labelPart} Container`} id={`${idPart}-origin-container-input`} hidden={isHidden || !isEnabled} placeholder='Container or repository name' changeFunction={setContainer} />
            <SigMfTextInput label={`${labelPart} File Path`} id={`${idPart}-origin-filepath-input`} hidden={isHidden || !isEnabled} placeholder='Path to the file within the container' changeFunction={setFilePath} required/>
        </div>
    );
}