import AsyncStorage from '@react-native-async-storage/async-storage';

// Classe para o Armazém.
class Warehouse {
    constructor(id, name, location, capacity, currentCapacity, zones, status, createdAt) {
        this.id = id;
        this.name = name;                           // Nome do depósito.
        this.location = location;                   // Endereço.
        this.capacity = capacity;                   // Capacidade total do depósito.
        this.currentCapacity = currentCapacity;     // Capacidade atual disponível.
        this.zones = zones;                         // Lista de zonas dentro do depósito (frio, seco).
        this.status = status;                       // Ativo / Inativo.
        this.createdAt = createdAt;                 // Data de criação do depósito.
        this.items = [];                            // Lista de itens no depósito.
    };

    getId() {
        return this.id;
    };

    // Adiciona um item ao depósito.
    addItem(item) {
        if (this.currentCapacity + item.volume <= this.capacity) {
            this.items.push(item);
            this.currentCapacity += item.volume;
            return true;
        }
        return false;
    };

    // Remove um item do depósito.
    removeItem(itemId) {
        const index = this.items.findIndex(item => item.id === itemId);
        if(index > -1) {
            this.currentCapacity -= this.items[index].volume;
            this.items.splice(index, 1);
            return true;
        }
        return false;
    };

    // Retorna a capacidade disponível do depósito.
    getAvailableCapacity() {
        return this.capacity - this.currentCapacity;
    };
};

export default Warehouse;