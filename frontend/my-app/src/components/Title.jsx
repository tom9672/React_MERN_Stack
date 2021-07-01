import React from 'react'
import {Helmet} from 'react-helmet'

const Title = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Title.defaultProps = {
    title:'Welcome to Online Store',
    description:'Welcome to Online Store',
    keywords:'Welcome to Online Store'
}

export default Title
