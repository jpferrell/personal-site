import { useEffect, useState } from 'react'
import SigMfTextInput from './SigMfTextInput'
import { SigMfDataChangeType } from '../SigMfInterfaces';

export default function SigMfDataChangeInput ( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function } ) {

    const [author, setAuthor] = useState<string|null>(null);
    const [datetime, setDatetime] = useState<string|null>(null);

    const [dataChange, setDataChange] = useState<SigMfDataChangeType|null>({
        datetime: null
    });

    useEffect(() => {
        setDataChange({...dataChange, author: author});
    }, [author]);

    useEffect(() => {
        changeFunction(dataChange);
    }, [dataChange]);

    <div id={`${idPart}-data-change-input`} hidden={isHidden}>
        <SigMfTextInput label='Author' id={`${idPart}-data-change-author-input`} placeholder='email' hidden={isHidden} changeFunction={setAuthor} />
        <SigMfTextInput label='Datetime' id={`${idPart}-data-change-datetime-input`} placeholder='YYYY-MM-DD' hidden={isHidden} changeFunction={setDatetime} required />
    </div>
}