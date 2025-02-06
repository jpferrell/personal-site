import { useEffect, useState } from 'react'
import SigMfTextInput from './SigMfTextInput'
import { SigMfDataChangeType } from '../SigMfInterfaces';
import { changeStateTextInput } from '../SigMfFunctions';
import SigMfCheckboxInput from './SigMfCheckboxInput';

export default function SigMfDataChangeInput ( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function } ) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [author, setAuthor] = useState<string|null>(null);
    const [datetime, setDatetime] = useState<string|null>(null);

    const [dataChange, setDataChange] = useState<SigMfDataChangeType>({
        enabled: false,
        datetime: null
    });

    useEffect(() => {
        setDataChange({...dataChange, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateTextInput(dataChange, author, 'author', setDataChange);
    }, [author]);

    useEffect(() => {
        setDataChange({...dataChange, datetime: datetime});
    }, [datetime]);

    useEffect(() => {
        if (dataChange.enabled && !Object.values(dataChange).includes(null)) {
            const retObj: SigMfDataChangeType = {...dataChange};
            delete retObj.enabled;
            changeFunction(retObj);
        } else if (dataChange.enabled && Object.values(dataChange).includes(null)) {
            changeFunction(null);
        }
    }, [dataChange]);

    return (
        <div id={`${idPart}-data-change-input`} hidden={isHidden}>
            <SigMfCheckboxInput label={`${labelPart}`} id={`${idPart}-data-change-enabled-input`} hidden={isHidden} changeFunction={setIsEnabled} />
            <SigMfTextInput label={`${labelPart} Author`} id={`${idPart}-data-change-author-input`} placeholder='email address of the author who changed the metadata' hidden={isHidden || !isEnabled} changeFunction={setAuthor} />
            <SigMfTextInput label={`${labelPart} Datetime`} id={`${idPart}-data-change-datetime-input`} placeholder='YYYY-MM-DD' hidden={isHidden || !isEnabled} changeFunction={setDatetime} required />
        </div>
    );
}