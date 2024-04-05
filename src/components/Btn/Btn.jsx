import { PropTypes } from 'prop-types';
import './Btn.css';

export default function Btn({isActive, title, onBtnClick}){
    const btnClass = isActive ? 'btn btn_active' : 'btn';
    return <button onClick={onBtnClick} className={btnClass}>{title}</button>
}

Btn.propTypes = {
    isActive: PropTypes.bool,
    title: PropTypes.string,
    onBtnClick: PropTypes.func
}