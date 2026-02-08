import react from 'react'

const Logo = ({color,size,misc}) => {
    return (
        <h1 className={`
                ${color}
                font-extrabold
                ${size}
                ${misc}
                `}>

            FiveStack

        </h1>
    )
}

export default Logo