import { useEffect, useState } from 'react';
import SigMfTextInput from './SigMfTextInput'
import { SigMfOriginType } from '../SigMfInterfaces';
import { changeStateTextInput } from '../SigMfFunctions';
import SigMfCheckboxInput from './SigMfCheckboxInput';

export default function SigMfOriginInput( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function } ) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [account, setAccount] = useState<string|null>(null);
    const [container, setContainer] = useState<string|null>(null);
    const [filePath, setFilePath] = useState<string|null>(null);

    const [originData, setOriginData] = useState<SigMfOriginType>({
        enabled: false,
        file_path: null
    });

    useEffect(() => {
        setOriginData({...originData, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateTextInput(originData, account, 'account', setOriginData);
    }, [account]);

    useEffect(() => {
        changeStateTextInput(originData, container, 'container', setOriginData);
    }, [container]);

    useEffect(() => {
        setOriginData({...originData, file_path: filePath});
    }, [filePath]);

    useEffect(() => {
        if (originData.enabled && !Object.values(originData).includes(null)) {
            const retObj: SigMfOriginType = {...originData};
            delete retObj.enabled;
            changeFunction(retObj);
        } else if (originData.enabled && Object.values(originData).includes(null)) {
            changeFunction(null);
        }
    }, [originData]);

    return (
        <div id={`${idPart}-origin-container`} hidden={isHidden}>
            <SigMfCheckboxInput label={`${labelPart}`} id={`${idPart}-origin-enabled`} changeFunction={setIsEnabled} />
            <SigMfTextInput label={`${labelPart} Account`} id={`${idPart}-origin-account-input`} hidden={isHidden || !isEnabled} changeFunction={setAccount} placeholder='Account name or identifier' />
            <SigMfTextInput label={`${labelPart} Container`} id={`${idPart}-origin-container-input`} hidden={isHidden || !isEnabled} placeholder='Container or repository name' changeFunction={setContainer} />
            <SigMfTextInput label={`${labelPart} File Path`} id={`${idPart}-origin-filepath-input`} hidden={isHidden || !isEnabled} placeholder='Path to the file within the container' changeFunction={setFilePath} required/>
        </div>
    );
}