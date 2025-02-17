import { AllfeatClient, AllfeatProvider } from "@allfeat/sdk";

export class BalanceFetcher {
  private account: string;

  constructor(account: string) {
    this.account = account;
  }

  public async fetch(): Promise<bigint> {
    const client = await AllfeatClient.new(new AllfeatProvider("melodie"));

    console.log("Fetching balance for: " + this.account);
    const result = await client.query.system.account(this.account);

    console.log("Received free balance: " + result.data.free);

    return result.data.free;
  }
}
