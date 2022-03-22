import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/index' 

export const useFetch = (url) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url) return

        setLoading(true);

        async function fetchData() {
            
            try {
                const response = await fetch(url)
                const data = await response.json();
                setData(data)
            } catch(error) {

                console.log(error);
                setError(true)
            } finally {
                
                setLoading(false);
            }
        }
        
        fetchData()
    }, [url])

    return {isLoading, data, error};
}

export const useTheme = () => {
    
    const { toggleTheme, theme } = useContext(ThemeContext);

    return { toggleTheme, theme };
}