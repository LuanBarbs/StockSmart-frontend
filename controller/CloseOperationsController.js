import ItemController from "./ItemController";
import WarehouseController from "./WarehouseController";
import HistoryController from "./HistoryController";

class CloseOperationsController {
    static async getBalance() {
        try {
            const balance = ItemController.listItems();
            return balance;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar saldo" };
        }
    };

    static async getWarehouses() {
        try {
            const warehouses = WarehouseController.listWarehouses();
            return warehouses;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar armazéns" };
        }
    };

    static async closeOperations(items, period, warehouseId = null) {
        try {
            if(!items || items.length === 0) {
                return { status: 400, error: "Nenhum item para fechar operações." };
            }

            const expiredItems = items.filter(item => new Date(item.expirationDate) < new Date());
            if(expiredItems.length > 0) {
                return { status: 400, error: "Existem itens expirados no estoque. Revise antes de fechar." };
            }

            const initialBalance = await this.getBalance();

            let filteredItems = items;
            if (warehouseId) {
                filteredItems = items.filter(item => item.warehouseId === warehouseId);
            }
            
            for (const item of filteredItems) {
                await ItemController.remove(item.id);
            }

            const finalBalance = await this.getBalance();

            await HistoryController.createHistory({
                action: "Fechar Operações",
                dateTime: new Date(),
                userName: "",
                userRole: "Gerente",
                location: warehouseId ? `Armazém ${warehouseId}` : "Todos os Armazéns",
                description: `Fechamento do período ${period} realizado com sucesso.`
            });

            return {
                status: 200,
                message: "Operação fechada com sucesso!",
                initialBalance,
                finalBalance,
            };
        } catch (error) {
            return { status: 500, error: "Erro ao fechar operações" };
        }
    };
};

export default CloseOperationsController;