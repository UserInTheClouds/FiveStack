import react from 'react';

const Button = ({textcolor,btn_text,btn_color,btn_hover,misc,padding}) => {
    return(
        <button className={`
            ${btn_color}
            text-md
            ${textcolor}
            font-medium
            font-sans
            ${padding}
            hover:cursor-grab 
            rounded-md 
            transition-all 
            duration-100 
            ${btn_hover}
            ${misc}`}>

            {btn_text}

        </button>

    )
}

export default Button