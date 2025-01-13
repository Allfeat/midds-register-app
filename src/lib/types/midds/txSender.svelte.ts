import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { AllfeatClient, AllfeatProvider, type IMidds, type IRegisterResult, type StakeholderInputs } from '@allfeat/sdk'

export class TxSender {
    midds: IMidds<StakeholderInputs>
    account: InjectedAccountWithMeta
    status: TxSenderStatus = $state(TxSenderStatus.Init)

    constructor(midds_data: IMidds<StakeholderInputs>, account: InjectedAccountWithMeta) {
        this.midds = midds_data
        this.account = account
    }

    public async execute(): Promise<IRegisterResult> {
        const client = await AllfeatClient.new(new AllfeatProvider('devnet'))
        this.status = TxSenderStatus.ApiReady

        const injector = await web3FromAddress(this.account.address)
        this.status = TxSenderStatus.FetchedInjector

        return this.midds.register(client, this.account.address, injector.signer, () => {})
    }
}

export enum TxSenderStatus {
    Init,
    ApiReady,
    FetchedInjector,
    TxCreated,
    TxSigned,
    TxSended,
}
