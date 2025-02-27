import {
    getStorageRules,
    insertStorageRule,
    updateStorageRule
} from "../api/storageRulesApi";

class StorageRulesController {
    static async saveStorageRules(rules) {
        try {
            for (const rule of rules) {
                if (rule.id) {
                    await updateStorageRule(rule);
                } else {
                    await insertStorageRule(rule);
                }
            }
            return { success: true };
        } catch (error) {
            return { error: 'Erro ao salvar as regras de armazenagem.' };
        }
    }

    static async getStorageRules() {
        try {
            const rules = await getStorageRules();
            return rules || [];
        } catch (error) {
            return { error: 'Erro ao carregar as regras de armazenagem.' };
        }
    }
}

export default StorageRulesController;