import { SharedState } from "@huds0n/shared-state";

import type { Types } from "./types";

export class FABState extends SharedState<Types.State> {
  _id: symbol;

  static register = {};

  constructor() {
    super({
      actions: [],
      isAnimating: false,
      isHidden: false,
      isOpen: false,
      onFABPress: null,
    });

    this._id = Symbol("FABState ID");

    this.openFAB = this.openFAB.bind(this);
    this.closeFAB = this.closeFAB.bind(this);
    this.closeOtherFABs = this.closeOtherFABs.bind(this);
    this.closeAllFABs = this.closeAllFABs.bind(this);
    this.toggleFAB = this.toggleFAB.bind(this);
    this.setFABActions = this.setFABActions.bind(this);
    this.hideFAB = this.hideFAB.bind(this);
    this.showFAB = this.showFAB.bind(this);

    const _this = this;

    Object.assign(FABState.register, { [this._id]: this });
  }

  openFAB() {
    this.setState({ isOpen: true });
  }

  closeFAB() {
    this.setState({ isOpen: false });
  }

  closeOtherFABs() {
    Object.getOwnPropertySymbols(FABState.register)
      .filter((key) => key !== this._id)
      // @ts-ignore
      .forEach((key) => FABState.register[key].closeFAB());
  }

  closeAllFABs() {
    Object.getOwnPropertySymbols(FABState.register)
      // @ts-ignore
      .forEach((key) => FABState.register[key].closeFAB());
  }

  toggleFAB() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  setFABActions(
    actions: (Types.Action | false)[],
    onFABPress: null | (() => void) = null
  ) {
    this.setState({ actions, isHidden: !actions.length, onFABPress });
  }

  hideFAB() {
    this.setState({ isHidden: true });
  }

  showFAB() {
    this.setState({ isHidden: false });
  }
}
