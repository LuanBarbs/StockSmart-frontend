import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Item {
    constructor(id, name, description, quantity, location) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.location = location;
    };

    static async saveItem(item) {
        try {
            const storedItems = await AsyncStorage.getItem("items");
            const items = storedItems ? JSON.parse(storedItems) : [];
            items.push(item);
            await AsyncStorage.setItem("items", JSON.stringify(items));
        } catch (error) {
            console.error("Erro ao salvar item no AsyncStorage: ", error);
        }
    };

    static async getAllItems() {
        try {
            const storedItems = await AsyncStorage.getItem("items");
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            console.log("Erro ao recuperar itens do AsyncStorage: ", error);
            return [];
        }
    };
};