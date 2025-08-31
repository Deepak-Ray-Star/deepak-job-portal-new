import { createContext, use, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";


export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const [searchFilter , setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]); // to store jobs fetched from backend based on search filter

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const fetchJobs = async()=>{
        setJobs(jobsData);
    }

    useEffect(()=>{
        fetchJobs();
    },[])
    
    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}