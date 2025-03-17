import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const useUser = (uid) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uid) return;

        const fetchUser = async () => {
            try {
                const userDocRef = doc(db, "users", uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUser(userDoc.data());
                } else {
                    setError("User not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [uid]);

    return { user, loading, error };
};

export default useUser;
