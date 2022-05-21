import React from "react";
export const NestedMenuContext = React.createContext({
  addMenuToNesting: () => {},
  removeMenuFromNesting: () => {},
  getParentMenu: () => {},
  getChildMenu: () => {},
  nestedMenuHoverIndex: -1,
  isNestedMenuVisible: () => {
    return false;
  },
  mountRef: { current: null },
});
function isSame(a, b) {
  if (!a || !b) {
    return false;
  }
  return a.isSameNode(b);
}
export default class NestedMenus extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { menus: [], nestedMenuHoverIndex: -1 };
    this.mountRef = React.createRef();
    this.mouseLeaveTimeoueId = null;
    this.handleMenuMouseLeave = (event) => {
      this.mouseLeaveTimeoueId = setTimeout(() => {
        this.setState({ nestedMenuHoverIndex: -1 });
      }, 200);
    };
    this.handleMenuMouseEnter = (event) => {
      if (__BROWSER__) {
        clearTimeout(this.mouseLeaveTimeoueId);
        const index = this.state.menus.findIndex((m) => {
          return (
            m.current &&
            event.currentTarget instanceof Node &&
            m.current.contains(event.currentTarget)
          );
        });
        this.setState({ nestedMenuHoverIndex: index });
      }
    };
    this.addMenuToNesting = (ref) => {
      const element = ref.current;
      if (element && element.offsetHeight) {
        element.addEventListener("mouseenter", this.handleMenuMouseEnter);
        element.addEventListener("mouseleave", this.handleMenuMouseLeave);
        this.setState((state) => {
          return { menus: [...state.menus, ref] };
        });
      }
    };
    this.removeMenuFromNesting = (ref) => {
      this.setState((state) => {
        for (const r of this.state.menus) {
          if (r.current && isSame(r.current, ref.current)) {
            const element = r.current;
            element.removeEventListener("mouseenter", this.handleMenuMouseEnter);
            element.removeEventListener("mouseleave", this.handleMenuMouseLeave);
          }
        }
        const nextMenus = state.menus.filter((r) => {
          return r.current && !isSame(r.current, ref.current);
        });
        return { menus: nextMenus };
      });
    };
    this.findMenuIndexByRef = (ref) => {
      return this.state.menus.findIndex((r) => {
        return isSame(r.current, ref.current);
      });
    };
    this.getParentMenu = (ref) => {
      const index = this.findMenuIndexByRef(ref) - 1;
      return this.state.menus[index];
    };
    this.getChildMenu = (ref) => {
      const index = this.findMenuIndexByRef(ref) + 1;
      return this.state.menus[index];
    };
    this.isNestedMenuVisible = (ref) => {
      const index = this.findMenuIndexByRef(ref);
      return index <= this.state.nestedMenuHoverIndex;
    };
  }
  render() {
    return (
      <NestedMenuContext.Provider
        value={{
          addMenuToNesting: this.addMenuToNesting,
          removeMenuFromNesting: this.removeMenuFromNesting,
          getParentMenu: this.getParentMenu,
          getChildMenu: this.getChildMenu,
          isNestedMenuVisible: this.isNestedMenuVisible,
          nestedMenuHoverIndex: this.state.nestedMenuHoverIndex,
          mountRef: this.mountRef,
        }}
      >
        <React.Fragment>
          {this.props.children}
          <span ref={this.mountRef} />
        </React.Fragment>
      </NestedMenuContext.Provider>
    );
  }
}
