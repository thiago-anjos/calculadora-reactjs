import React from 'react';
import './style.scss'

export default props =>{

    let classes = 'button ';
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return(
        // <button className={`
        //     button 
        //     ${props.operation? 'operation': ''}
        //     ${props.double ? 'double': ''} 
        //     ${props.triple ? 'triple': ''} 
        //     `}>
        //     {props.label}
        // </button>
        <button className={classes} onClick={()=> props.click && props.click(props.label)}>{props.label}</button>
    )
}
