import React from "react";

const DashboardContext = React.createContext()

function DashboardContextProvider(props) {

    const [recentFilesOpened, setrecentFilesOpened] = React.useState([]);
    const [recentFoldersOpened, setrecentFoldersOpened] = React.useState();
    const [recentActionsTaken, setrecentActionsTaken] = React.useState();
    const [wordCount, setwordCount] = React.useState();
    const [darkMode, setdarkMode] = React.useState();
    // const [RecentLibariesExplored, setRecentLibariesExplored] = React.useState();

    const addToRecentFiles = (item) => {
        setrecentFilesOpened(prev => [...prev, item])
    }

    console.log(recentFilesOpened)


    return (
        <DashboardContext.Provider value={{recentFilesOpened, addToRecentFiles}} >
              {props.children}
        </DashboardContext.Provider>
    )
}

export {DashboardContextProvider, DashboardContext}