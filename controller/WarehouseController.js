import Warehouse from "../models/Warehouse";

export function insertWarehouse(warehouse) {
    try {
        Warehouse.createWarehouse(warehouse);
    } catch (error) {
        console.error(error);
    }
}
