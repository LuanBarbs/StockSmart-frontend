import AsyncStorage from "@react-native-async-storage/async-storage";

// Classe para os itens.
export default class Item {
    constructor(id, name, quantity, warehouseId, category, volume, expirationDate, createdAt, status) {
        this.id = id;
        this.name = name;                       // Nome do item.
        this.quantity = quantity;               // Quantidade atual.
        this.warehouseId = warehouseId;         // Depósito onde o item está armazenado.
        this.category = category;               // Categoria do item (eletrônicos, alimentos).
        this.volume = volume;                   // Volume unitário do item (para cálculos de ocupação).
        this.expirationDate = expirationDate;   // Data de validade (se tiver).
        this.createdAt = createdAt;             // Data de registro do item.
        this.status = status;                   // Status do item (disponível, reservado, danificado).
    };

    // Retorna se o item está disponível.
    checkAvailability() {
        return this.quantity > 0;
    };

    //  Verifica se o item está marcado como avariado.
    isDamaged() {
        return this.status === "damaged";
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