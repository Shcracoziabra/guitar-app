import { PropTypes } from 'prop-types';
import './SwitchBtn.css';

export default function SwitchBtn({offGliph, onGliph, onSwitch, value}){
    return (
        <div className='switch-wrapper'>
            <label className='switch__btn' htmlFor="switch">
            <input id='switch' onChange={onSwitch} type="checkbox" value={value}/>
            <span data-on={onGliph || ' '} data-off={offGliph || ' '} ></span>
            </label>
        </div>
    )
    
}

SwitchBtn.propTypes = {
    offGliph: PropTypes.string,
    onGliph: PropTypes.string,
    onSwitch: PropTypes.func,
    value: PropTypes.bool
}


