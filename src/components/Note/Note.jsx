import { PropTypes } from 'prop-types';
import { guitar } from '../../guitar';
import './Note.css';

export default function Note({ note, oct, freq }){
    const noteClass = `note note_${oct}`;
    const accidental =  note.accidental === 'n' ? '' : guitar.accidCodes[note.accidental]
    return (
        <button onClick={()=> guitar.generateSound([freq])} data-freq={freq} className={noteClass}>{note.title + accidental}</button>
    )
}

Note.propTypes = {
    note: PropTypes.shape({
        title: PropTypes.string,
        accidental: PropTypes.string,
    }),
    oct: PropTypes.number,
    freq: PropTypes.number,

}