import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error(`Erro ao buscar dados de ${key}:`, e);
        return [];
    }
};

export const insertData = async (key, newData) => {
    try {
        const data = await getData(key);
        data.push(newData);
        await AsyncStorage.setItem(key, JSON.stringify(data));
        return newData;
    } catch (e) {
        console.error(`Erro ao inserir em ${key}:`, e);
    }
};

export const updateData = async (key, updatedData) => {

    try {
        let data = await getData(key);
        data = data.map(dt => (dt.id === updatedData.id ? updatedData : dt));
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Erro ao atualizar ${key}:`, e);
    }
};

export const deleteData = async (key, id) => {
    try {
        let data = await getData(key);
        data = data.filter(dt => dt.id !== id);
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Erro ao deletar de ${key}:`, e);
    }
};

export const getDataById = async (key, id) => {
    try {
        const data = await getData(key);
        return data.find(dt => dt.id == id) || null;
    } catch (e) {
        console.error(`Erro ao buscar ${id} em ${key}:`, e);
        return null;
    }
};