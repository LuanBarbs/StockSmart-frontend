import History from "../models/History";
import { getHistory, insertHistory, updateHistory, deleteHistory, getHistoryById } from "../api/historyApi";

class HistoryController {
    static async listHistory() {
        try {
            const history = await getHistory();
            return history;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar o histórico" };
        }
    };

    static async createHistory(req) {
        const { action, userName, userRole, location, description } = req;
        
        try {
            const history = await getHistory();

            const newHistory = new History(
                history.length + 1,
                action, new Date(), userName, userRole, location, description
            );

            await insertHistory(newHistory);
            return { status: 201, message: "Histórico inserido com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao inserir histórico" };
        }
    };
};

export default HistoryController;