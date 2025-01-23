export default async function handler(req, res) {
    const history = [
        { id: 1, action: 'Entrada de Cadeira', date: '2025-01-20', location: 'Armazém A', user: 'João' },
        { id: 2, action: 'Saída de Mesa', date: '2025-01-20', location: 'Armazém B', user: 'Maria' },
        { id: 3, action: 'Entrada de Notebook', date: '2025-01-20', location: 'Armazém A', user: 'Carlos' },
        { id: 4, action: 'Entrada de Cadeira', date: '2025-01-21', location: 'Armazém A', user: 'Luiza' },
        { id: 5, action: 'Saída de Cadeira', date: '2025-01-21', location: 'Armazém B', user: 'Pedro' },
        { id: 6, action: 'Entrada de Monitor', date: '2025-01-22', location: 'Armazém C', user: 'Ana' },
        { id: 7, action: 'Saída de Notebook', date: '2025-01-22', location: 'Armazém A', user: 'Fernanda' },
        { id: 8, action: 'Entrada de Teclado', date: '2025-01-22', location: 'Armazém B', user: 'João' },
        { id: 9, action: 'Saída de Teclado', date: '2025-01-22', location: 'Armazém C', user: 'Maria' },
        { id: 10, action: 'Entrada de Mouse', date: '2025-01-23', location: 'Armazém A', user: 'Carlos' },
    ];

    res.status(200).json({ history });
};