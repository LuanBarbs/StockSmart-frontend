export default async function handler(req, res) {
    const { period, warehouseId } = req.body;

    if(period === 'daily' || period === 'weekly') {
        res.status(200).json({ message: 'Fechamento realizado com sucesso!' });
    } else {
        res.status(400).json({ message: 'Período Inválido.' });
    }
};