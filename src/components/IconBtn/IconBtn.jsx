import { PropTypes } from 'prop-types';
import './IconBtn.css';

import ukelele from '../../assets/ukelele.svg';
import note from '../../assets/musical-note.svg';

export default function IconBtn({iconName, onBtnClick}){
    const src = iconName === 'ukelele' ? ukelele : note;
    return (
        <button onClick={onBtnClick} className='icon-btn'>
            <img className='icon' src={src} alt={iconName} />
        </button>
    )
}

IconBtn.propTypes = {
    iconName: PropTypes.string,
    onBtnClick: PropTypes.func
}