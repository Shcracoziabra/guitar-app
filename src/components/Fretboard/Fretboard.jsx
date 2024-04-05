import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import String from '../String/String';
import './Fretboard.css';

export default function Fretboard(){
    const { notesData } = useContext(AppContext);
    const strings = notesData.map((stringData, i) => <String key={i} data={stringData} count={i+1}/>)

    return (
        <div className='fretboard'>{strings}</div>
    )
}