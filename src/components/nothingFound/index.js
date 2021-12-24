import React from 'react'
import './style.scss'

const NothingFound = ({title}) => {
    return (
        <div>
            <h2 className="notfoundmessage">No {title} found! </h2>
        </div>
    )
}

export default NothingFound
