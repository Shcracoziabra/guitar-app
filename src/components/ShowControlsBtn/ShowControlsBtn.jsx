import { PropTypes } from 'prop-types';
import './ShowControlsBtn.css';

export default function ShowControlsBtn({isActive, title, onBtnClick}){
    const btnClass = isActive ? 'show-btn show-btn_active' : 'show-btn';
    return <button onClick={onBtnClick} className={btnClass}>{title}</button>
}

ShowControlsBtn.propTypes = {
    isActive: PropTypes.bool,
    title: PropTypes.string,
    onBtnClick: PropTypes.func
}