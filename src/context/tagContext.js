import React from "react";

const TagContext = React.createContext()


const TagContextProvider = (props) => {
    const [tagsArray, settagsArray] = React.useState();
    const [usertagsArray, setusertagsArray] = React.useState();
    const [currentTag, setcurrentTag] = React.useState();


    return (
        <TagContext.Provider value={{currentTag}}>
            {props.children}
        </TagContext.Provider>
    )
}

export {TagContext, TagContextProvider}