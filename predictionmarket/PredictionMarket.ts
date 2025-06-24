import { address, Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type PredictionMarketConfig = {
    admin: Address;
};

export function predictionMarketConfigToCell(config: PredictionMarketConfig): Cell {
    return beginCell()
        .storeAddress(config.admin)
        .storeUint(0, 8)
        .storeRef(beginCell().endCell())
        .storeUint(0, 32)
        .storeDict(null)
        .storeDict(null)
        .storeUint(0, 64)
        .endCell();
}

export class PredictionMarket implements Contract {
    
    readonly address: Address;
    readonly init: { code: Cell; data: Cell };
    readonly contract: Contract;

    constructor(address: Address, init: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
        this.contract = {address, init};   
    }

    static createFromConfig(config: PredictionMarketConfig, code: Cell): PredictionMarket {
        const data = predictionMarketConfigToCell(config);
        const init = { code, data };
        const address = contractAddress(0, init);
        return new PredictionMarket(address, init);
    }

    

    // 📤 Deploy the contract with initial admin address
    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint, admin: Address) {
        const body = beginCell()
            .storeAddress(admin)
            .endCell();

        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body,
        });
    }
    

    // 🔍 Check if contract is active
    async getState(provider: ContractProvider) {
        const state = await provider.getState();
        return state;
    }

    // 📥 Call get_contract_data()
    async getContractData(provider: ContractProvider) {
        const result = await provider.get('get_contract_data', []);
        return {
            admin_address: result.stack.readAddress(),
            sub_admin_count: result.stack.readNumber(),
            sub_admins: result.stack.readCellOpt(),
            market_count: result.stack.readNumber(),
            markets_dict: result.stack.readCellOpt(),
            predictions_dict: result.stack.readCellOpt(),
            fees: result.stack.readNumber(),
        };
    }

    // 📥 Call get_market(id)
    async getMarket(provider: ContractProvider, marketId: number) {
        const result = await provider.get('get_market', [
            { type: 'int', value: BigInt(marketId) },
        ]);
        return {
            question: result.stack.readCell(),
            startTime: result.stack.readNumber(),
            closeTime: result.stack.readNumber(),
            yesPool: result.stack.readBigNumber(),
            noPool: result.stack.readBigNumber(),
            outcome: result.stack.readNumber(),
        };
    }
}