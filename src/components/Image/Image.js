import React from 'react'
import PropTypes from 'prop-types'

const Image = ({src,alt}) => {
    return (
        <img src={src} alt={alt} width='200px' height='250px'/>
    )
}

Image.propTypes = {
    src : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
}
export default Image
