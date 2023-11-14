const useLocalStorage = () => {


    /**
     * @param key
     * @param value
     * @param {number} ttl- Time to live in seconds.
     */
    const set = (key: string, value: string, ttl: number) => {
        const data = {
            value: value,                  // store the value within this object
            ttl: Date.now() + (ttl * 1000),   // store the TTL (time to live)
        }
        // store data in LocalStorage
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * @returns {any|null} returns the value associated with the key if its exists and is not expired. Returns `null` otherwise
     * @param key
     */
    const get = (key: string) => {
        const data = localStorage.getItem(key);
        if (!data) {     // if no value exists associated with the key, return null
            return null;
        }

        const item = JSON.parse(data);

        // If TTL has expired, remove the item from localStorage and return null
        if (Date.now() > item.ttl) {
            localStorage.removeItem(key);
            return null;
        }

        // return data if not expired
        return item.value;
    }

    return {set, get}
}

export default useLocalStorage
