import { PropTypes } from 'prop-types';
import './Fret.css';

export default function Fret({ children, signed, num }){
    const fret = signed ?   <div className='fret fret_count' data-num={num}>
                                {children}
                            </div> :
                            <div className='fret'>
                                {children}
                            </div> 
    return (
        <>{fret}</>
    )
}

Fret.propTypes = {
    children: PropTypes.element,
    signed: PropTypes.bool,
    num: PropTypes.string
}