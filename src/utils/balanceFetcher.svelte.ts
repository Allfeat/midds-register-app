import { AllfeatClient, AllfeatProvider } from "@allfeat/sdk";

export class BalanceFetcher {
  private account: string;

  constructor(account: string) {
    this.account = account;
  }

  public async fetch(): Promise<bigint> {
    const client = await AllfeatClient.new(new AllfeatProvider("melodie"));
    const result = await client.query.system.account(this.account);

    return result.data.free;
  }
}
