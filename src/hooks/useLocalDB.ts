
const dbName = "localDB"

// Define your IndexedDB setup function
const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, 1);

        request.onerror = () => {
            reject(new Error('Failed to open the database'));
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(dbName, {
                autoIncrement: true,
                keyPath: 'id'
            })
            // Create object stores or perform other setup here.
        };
    });
}

// Define the useLocalDB hook
const useLocalDB = () => {

    const set = async (data: any) => {
        //Remember to encrypt
        const db = await openDatabase()
        const trans = db.transaction([dbName], "readwrite")

        const objectStore = trans.objectStore(dbName),
            request = objectStore.add(data)
        db.close()
        return request
    }

    const get = async (id: number) => {
        const db = await openDatabase()
        const trans = db.transaction([dbName], "readonly")

        const objectStore = trans.objectStore(dbName),
            getRequest = objectStore.get(id)

        return new Promise((resolve, reject) => {
            getRequest.onsuccess = ((event: any) =>  resolve(event.target.result))
            getRequest.onerror = (ev => reject(ev))
        })
    }

    return {set, get};
};

export default useLocalDB

// Create a function component that uses the useLocalDB hook
// const MyComponent: React.FC = () => {
//     const db = useLocalDB();
//
//     useEffect(() => {
//         if (db) {
//             // Perform IndexedDB operations here, like storing or retrieving data.
//         }
//     }, [db]);
//
//     return (
//         <div>
//             <h1>IndexedDB Example</h1>
//     <p>Database Status: {db ? 'Connected' : 'Not Connected'}</p>
//     </div>
// );
// };
//
// export default MyComponent;
