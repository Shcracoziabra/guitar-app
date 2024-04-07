import { PropTypes } from 'prop-types';
import { useRef, useEffect } from 'react';
import './ShowControlsBtn.css';

export default function ShowControlsBtn({isActive, title, onBtnClick}){
    const bodyRef = useRef(document.body);
    const mainRef = useRef(document.body.querySelector('main'));

    useEffect(()=>{
        isActive && bodyRef.current.scrollIntoView(true);
        !isActive && mainRef.current.scrollIntoView(true);
        bodyRef.current.style.overflow = isActive ? 'hidden' : '';
    }, [isActive, title]);

    const btnClass = isActive ? 'show-btn show-btn_active' : 'show-btn';
    return <button onClick={onBtnClick} className={btnClass}>{title}</button>
}

ShowControlsBtn.propTypes = {
    isActive: PropTypes.bool,
    title: PropTypes.string,
    onBtnClick: PropTypes.func
}