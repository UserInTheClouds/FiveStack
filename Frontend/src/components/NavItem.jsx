import react from 'react'

const NavItem = ({text,misc}) => {
    return(
        <h1 className={`
                text-white
                font-bold
                text-md
                hover:cursor-grab
                hover:text-gray-300
                relative
                after:absolute
                after:left-0
                after:bottom-0
                pb-0.5
                after:bg-gradient-to-r after:from-amber-400 after:to-pink-400
                after:transition-all
                after:duration-300
                after:h-1
                after:w-0
                hover:after:w-full
                ${misc}
        `}>
            {text}
        </h1>
    )
}

export default NavItem