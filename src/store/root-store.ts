import { CurrentUserStore } from "./current-user-store";
import { TrendyolStore } from "./trendyol-store";

export class RootStore {
  currentUser: CurrentUserStore;
  trendyol: TrendyolStore;

  constructor() {
    this.currentUser = new CurrentUserStore(this);
    this.trendyol = new TrendyolStore(this);
  }
}
