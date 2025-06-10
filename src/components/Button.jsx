import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-clr3",
    textColor = "text-clr5",
    className = "",
    ...props
}) {
    return (
        <button className={`px-12 py-2 rounded-xl text-xl ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
