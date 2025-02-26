import Item from "../models/Item";
import { getItems, insertItem, updateItem, deleteItem, getItemById } from "../api/itemApi";

class ItemController {
    static async listItems() {
        try {
            const items = await getItems();
            return items;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar itens" };
        }
    };

    static async createItem(req) {
        const { name, quantity, warehouseId, category, volume, expirationDate } = req;
        
        try {
            const items = await getItems();

            const newItem = new Item(
                items.length + 1,
                name, quantity, warehouseId, category, volume, expirationDate, new Date(), "active"
            );

            await insertItem(newItem);
            return { status: 201, message: "Item criado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao criar item" };
        }
    };

    static async updateItem(req) {
        const { id, name, quantity, warehouseId, category, volume, expirationDate, status } = req;
        
        try {
            let item = await getItemById(id);
            if (!item) return { status: 400, error: "Item não encontrado" };

            item.name = name || item.name;
            item.quantity = quantity || item.quantity;
            item.warehouseId = warehouseId || item.warehouseId;
            item.category = category || item.category;
            item.volume = volume || item.volume;
            item.expirationDate = expirationDate || item.expirationDate;
            item.status = status || item.status;

            await updateItem(item);
            return { status: 200, message: "Item atualizado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao atualizar item" };
        }
    };

    static async deleteItem(id) {
        try {
            let item = await getItemById(id);
            if (!item) return { status: 404, error: "Item não encontrado" };

            await deleteItem(id);
            return item;
        } catch (error) {
            return { status: 500, error: "Erro ao excluir item" };
        }
    };
};

export default ItemController;