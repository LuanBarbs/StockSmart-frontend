import AsyncStorage from '@react-native-async-storage/async-storage';

class Warehouse {
    constructor(id, name, address, width, depth, height, totalCapacity) {
        this.id = id;
        this.name = name;                   // Nome do depósito
        this.address = address;             // Endereço.
        this.width = width;                 // Largura total.
        this.depth = depth;                 // Profundidade total.
        this.height = height;               // Altura total.
        this.totalCapacity = totalCapacity; // Capacidade total do depósito.
    };

    // Método para salvar um depósito no AsyncStorage.
    static async saveWarehouse(warehouse) {
        try {
            const existingWarehouses = await Warehouse.getWarehouses();
            existingWarehouses.push(warehouse);
            await AsyncStorage.setItem('warehouses', JSON.stringify(existingWarehouses));
            return 'Depósito salvo com sucesso.';
        } catch (error) {
            throw new Error('Erro ao salvar o depósito.');
        }
    };

    // Método estático para obter todos os depósitos
    static async getWarehouses() {
        try {
            const storedWarehouses = await AsyncStorage.getItem('warehouses');
            return storedWarehouses ? JSON.parse(storedWarehouses) : [];
        } catch (error) {
            throw new Error('Erro ao buscar os depósitos.');
        }
    };

    // Método para verificar duplicidade de endereço.
    static async isAddressDuplicate(address) {
        const existingWarehouses = await Warehouse.getWarehouses();
        return existingWarehouses.some((warehouse) => warehouse.address === address);
    };

    // Método para verificar capacidade total.
    static async verifyCapacity(width, depth, height, totalCapacity) {
        return (totalCapacity > width*depth*height);
    }
};

export default Warehouse;