import type { IMiddsEntity } from '$lib/types/midds/entity.svelte'
import { ApiPromise, WsProvider } from '@polkadot/api'
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { ResultState } from '$utils/states.svelte'

export class TxSender<T extends IMiddsEntity> {
    midds_data: T
    account: InjectedAccountWithMeta
    wsProvider: WsProvider = new WsProvider()
    api: ApiPromise | null = null
    status: TxSenderStatus = $state(TxSenderStatus.Init)

    constructor(midds_data: T, account: InjectedAccountWithMeta) {
        this.midds_data = midds_data
        this.account = account
    }

    public async execute(): Promise<ResultState> {
        this.api = await ApiPromise.create({ provider: this.wsProvider })

        await this.api.isReady
        this.status = TxSenderStatus.ApiReady

        const injector = await web3FromAddress(this.account.address)
        this.status = TxSenderStatus.FetchedInjector

        const tx = this.midds_data.createTx(this.api)
        this.status = TxSenderStatus.TxCreated

        const tx_signed = await tx.signAsync(this.account.address, { signer: injector.signer })
        this.status = TxSenderStatus.TxSigned

        return new Promise<ResultState>((resolve, reject) => {
            tx_signed
                .send(async (result) => {
                    const { status, txHash, events } = result
                    this.status = TxSenderStatus.TxSended

                    console.log(`Transaction status: ${status.type}, txHash: ${txHash}`)

                    if (status.isInBlock) {
                        console.log(`✅ Transaction included in block ${status.asInBlock}`)

                        const extrinsicFailed = events.some(
                            (eventRecord) =>
                                eventRecord.event.method === 'ExtrinsicFailed'
                        )
                        if (extrinsicFailed) {
                            reject(new Error('Extrinsic Failed'))
                            return
                        }
                        else {
                            const result = new ResultState(extractMiddsHashFromEvents(events), txHash.toString(), status.asInBlock.toString())
                            resolve(result)
                        }
                    }

                    if (status.isDropped) {
                        reject(new Error('Transaction dropped'))
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    } catch (error: Error) {
        throw error
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

function extractMiddsHashFromEvents(events: EventRecord[]): string {
    const found = events.find(({ event: { method } }) => method === 'MIDDSRegistered')
    return found ? found.event.data[1].toString() : ''
}
