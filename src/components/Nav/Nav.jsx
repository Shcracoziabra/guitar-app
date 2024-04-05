import { PropTypes } from 'prop-types';
import './Nav.css';

export default function Nav({children}){
    return <nav className='nav'>{children}</nav>
}

Nav.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}