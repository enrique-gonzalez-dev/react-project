import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import _ from "lodash"

export const getItems = async () => {
  const db = getFirestore();
  const itemsCollection = collection(db, "items");
  const query = getDocs(itemsCollection);
  const result = await query;

  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

export const getItemsByCategory = async (category) => {
  const db = getFirestore();
  const itemsCollection = collection(db, "items");
  const q = query(itemsCollection, where("category", "==", _.capitalize(category)));
  const result = await getDocs(q);

  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

export const getItemById = async (id) => {
  const db = getFirestore();

  try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }

  } catch (e) {
    console.error("Error getting document:", e);
  }
}

export const getCategories = async () => {
  const db = getFirestore();
  const categoriesCollection = collection(db, "categories");
  const query = getDocs(categoriesCollection);

  const result = await query;
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

export const createSale = async (sale) => {
  const db = getFirestore();
  const salesCollection = collection(db, "orders");
  const docRef = await addDoc(salesCollection, sale);
  return docRef.id;
}

export const getSale = async (id) => {
  const db = getFirestore();
  const salesCollection = collection(db, "orders");
  const query = getDocs(salesCollection);

  const result = await query;
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }).find((sale) => sale.id === id);
}
