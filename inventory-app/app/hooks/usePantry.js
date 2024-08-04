import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase';

const usePantry = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'inventory'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []); // Fetch items on initial load

    const updateItem = async (id, item) => {
        const itemRef = doc(firestore, 'inventory', id);
        await updateDoc(itemRef, item);
        await fetchItems(); // Refresh items after update
    };

    const deleteItem = async (id) => {
        const itemRef = doc(firestore, 'inventory', id);
        await deleteDoc(itemRef);
        await fetchItems(); // Refresh items after delete
    };

    const addItem = async (item) => {
        await addDoc(collection(firestore, 'inventory'), item);
        await fetchItems(); // Refresh items after add
    };

    return { items, addItem, updateItem, deleteItem };
};

export default usePantry;
