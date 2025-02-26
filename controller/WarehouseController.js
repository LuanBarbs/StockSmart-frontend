import Warehouse from "../models/Warehouse";
import { getWarehouses, insertWarehouse, updateWarehouse, deleteWarehouse, getWarehouseById } from "../api/warehouseApi";

class WarehouseController {
    static async listWarehouses() {
        try {
            const warehouses = await getWarehouses();
            return warehouses;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar armazéns" };
        }
    };

    static async createWarehouse(req) {
        const { name, location, capacity, zones } = req;
        
        try {
            const warehouses = await getWarehouses();
            if (warehouses.some(warehouse => warehouse.location === location)) {
                return { status: 400, error: "Endereço já registrado" };
            }

            const newWarehouse = new Warehouse(
                warehouses.length + 1,
                name, location, capacity, zones
            );

            await insertWarehouse(newWarehouse);
            return { status: 201, message: "Armazém criado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao criar armazém" };
        }
    };

    static async updateWarehouse(req) {
        const { id, name, location, capacity, zones, status } = req;
        
        try {
            let warehouse = await getWarehouseById(id);
            if (!warehouse) return { status: 400, error: "Armazém não encontrado" };

            warehouse.name = name || warehouse.name;
            warehouse.location = location || warehouse.location;
            warehouse.capacity = capacity || warehouse.capacity;
            warehouse.zones = zones || warehouse.zones;
            warehouse.status = status || warehouse.status;

            await updateWarehouse(warehouse);
            return { status: 200, message: "Armazém atualizado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao atualizar armazém" };
        }
    };

    static async deleteWarehouse(id) {
        try {
            let warehouse = await getWarehouseById(id);
            if (!warehouse) return { status: 404, error: "Armazém não encontrado" };

            await deleteWarehouse(id);
            return { status: 200, message: "Armazém excluído com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao excluir armazém" };
        }
    };
};

export default WarehouseController;
