import { AppSteps } from '$lib/types/steps'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'
import type { IRegisterResult, IMidds, MiddsInputs } from '@allfeat/sdk'

class AppState {
  currentStep: AppSteps = $state(AppSteps.Intro)
  selectedMiddsEntity: IMidds<MiddsInputs> | null = $state(null)
  selectedMiddsEntityName: string | null = $state(null)
  walletState: WalletState = new WalletState()
  resultState: IRegisterResult | null = $state(null)
  isLoading: boolean = $state(false)

  goToPreviousStep() {
    if (this.currentStep !== AppSteps.Intro)
      this.currentStep--
  }

  goToNextStep() {
    if (this.currentStep !== AppSteps.Result) {
      console.log(this.currentStep)
      this.currentStep++
      console.log(this.currentStep)
    }
  }
}

class WalletState {
  extensions: InjectedExtension[] | null = $state(null)
  accounts: InjectedAccountWithMeta[] | null = $state(null)
  connected: boolean = $derived(this.accounts !== null && this.accounts?.length > 0)

  public async init() {
    this.extensions = await web3Enable('Allfeat MIDDS Registration')
    if (this.extensions.length > 0) {
      this.accounts = await web3Accounts()
    }
  }

  public shortenAddress(account: InjectedAccountWithMeta | undefined): string {
    if (!account) return ''

    const address = account.address
    return (
      address.substring(0, 5) +
      '...' +
      address.substring(address.length - 5)
    )
  }
}

export const appState = new AppState()
