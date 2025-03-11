import { useState } from "react";

const useLoading = (initialState = false) => {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
    const toggleLoading = () => setIsLoading((prev) => !prev);

    return { isLoading, startLoading, stopLoading, toggleLoading };
}

export default useLoading;
