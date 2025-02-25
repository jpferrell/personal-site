import { useEffect, useState } from 'react'
import SigMfTextInput from './SigMfTextInput'
import { SigMfDataChangeType } from '../SigMfInterfaces';
import { changeStateInput, cleanObject } from '../SigMfFunctions';
import SigMfCheckboxInput from './SigMfCheckboxInput';

export default function SigMfDataChangeInput ( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function } ) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [author, setAuthor] = useState<string>("");
    const [datetime, setDatetime] = useState<string>("");

    const [dataChange, setDataChange] = useState<SigMfDataChangeType>({
        enabled: false,
        datetime: ""
    });

    useEffect(() => {
        setDataChange({...dataChange, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(dataChange, author, 'author', setDataChange);
    }, [author]);

    useEffect(() => {
        setDataChange({...dataChange, datetime: datetime});
    }, [datetime]);

    useEffect(() => {
        if (dataChange.enabled) {
            const tmpObj: SigMfDataChangeType = {...dataChange};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            if (Object.hasOwn(retObj, 'datetime')) {
                changeFunction(retObj);
            } else {
                changeFunction({});
            }
        } else {
            changeFunction({});
        }
    }, [dataChange]);

    return (
        <div id={`${idPart}-data-change-input`} hidden={isHidden} className='border-2 m-2 border-dotted rounded-lg'>
            <SigMfCheckboxInput label={`${labelPart}`} id={`${idPart}-data-change-enabled-input`} hidden={isHidden} changeFunction={setIsEnabled} />
            <SigMfTextInput label={`${labelPart} Author`} id={`${idPart}-data-change-author-input`} placeholder='email address of the author who changed the metadata' hidden={isHidden || !isEnabled} changeFunction={setAuthor} />
            <SigMfTextInput label={`${labelPart} Datetime`} id={`${idPart}-data-change-datetime-input`} placeholder='YYYY-MM-DD' hidden={isHidden || !isEnabled} changeFunction={setDatetime} required />
        </div>
    );
}