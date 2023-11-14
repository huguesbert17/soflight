const useString = () => {

        const capitalizeFirstLetter = (str: string) => {
            str = str.toLowerCase()
            if (str.length === 0) return str;
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

    const serialize = function(obj: any) {
        let str = [];
        for (const p in obj)
            if (obj.hasOwnProperty(p) && obj[p]) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

        return {capitalizeFirstLetter, serialize}
}
export default useString
