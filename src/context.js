import React, { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const getStoragePref = () => {
    let pref = "dark-mode";
    if (localStorage.getItem("prefrence"))
        pref = localStorage.getItem("prefrence");
    return pref;
};

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [theme, setTheme] = useState(getStoragePref());

    //toggle theme
    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === "dark-mode" ? "light-mode" : "dark-mode"
        );
    };

    useEffect(() => {
        document.documentElement.classList = theme;
        localStorage.setItem("prefrence", theme);
    }, [theme]);

    //fetch stock images
    const fetchImages = async () => {
        setLoading(true);
        let url;
        const urlPage = `&page=${page}`;
        const urlQuery = `&query=${query}`;
        if (query) {
            url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
        } else {
            url = `${mainUrl}${clientID}${urlPage}`;
        }
        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);

            setPhotos((prevState) => {
                if (query) {
                    if (page === 1) {
                        return data.results;
                    } else {
                        return [...prevState, ...data.results];
                    }
                } else {
                    return [...prevState, ...data];
                }
            });
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    //fetch stock images
    useEffect(() => {
        fetchImages();
    }, [page]);

    //get light/dark pref
    useEffect(() => {
        getStoragePref();
    }, []);

    //Infinite Scroll
    useEffect(() => {
        let scrollEvent = window.addEventListener("scroll", () => {
            if (
                window.scrollY + window.innerHeight >=
                    document.body.offsetHeight - 5 &&
                !loading
            ) {
                setPage((prevState) => prevState + 1);
            }
        });
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        };
    }, []);

    const searchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchImages();
    };

    return (
        <AppContext.Provider
            value={{
                photos,
                loading,
                query,
                setQuery,
                searchSubmit,
                toggleTheme,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
