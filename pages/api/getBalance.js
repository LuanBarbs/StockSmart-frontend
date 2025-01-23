export default async function handler(req, res) {
    const balance = {
        items: [
            { id: 1, name: 'Cadeira', quantity: 100, category: 'Móveis', volume: '1.5m³', expirationDate: '2025-12-31', status: 'Ativo' },
            { id: 2, name: 'Mesa', quantity: 50, category: 'Móveis', volume: '2.0m³', expirationDate: '2025-12-31', status: 'Ativo' },
            { id: 3, name: 'Notebook', quantity: 30, category: 'Eletrônicos', volume: '0.01m³', expirationDate: '2025-05-01', status: 'Ativo' },
        ],
    };

    res.status(200).json(balance);
};