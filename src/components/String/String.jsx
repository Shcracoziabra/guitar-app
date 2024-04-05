import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import Fret from '../Fret/Fret';
import Note from '../Note/Note';
import { guitar } from '../../guitar';
import './String.css';

export default function String({ data, count }){

    const { shownNotesObj} = useContext(AppContext);
    const openNoteData = data[0];
    const openNoteShown = shownNotesObj[openNoteData.idx];
    const elements = data.slice(1).map((note, i) => {
        const shownNote = shownNotesObj[note.idx];
        const noteElem = shownNote ? <Note note={shownNote} oct={note.oct} freq={note.freq}/> : null
        return  <Fret key={i} signed={count === 6 && guitar.shownFrets.includes(i+1)} num={guitar.latins[i+1]}>
                    {noteElem}
                </Fret>
    })
    return (
        <div className='string'><div className='open-wrapper'>{openNoteShown && <Note note={openNoteShown} oct={openNoteData.oct} freq={openNoteData.freq}/>}</div>{elements}</div>
    )
}

String.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            oct: PropTypes.number, 
            idx: PropTypes.number, 
            freq: PropTypes.number
        })
    ),
    count: PropTypes.number
}