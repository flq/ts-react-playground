import * as React from "react";
import * as classNames from "classnames";
type SFC<T = {}> = React.SFC<T>;

export const Container: SFC = ({ children }) => (
  <div className="container">{children}</div>
);

export const Section: SFC = ({ children }) => (
  <section className="section">{children}</section>
);

export interface HeaderProps {
  size: 1 | 2 | 3 | 4;
}

export const Header: SFC<HeaderProps> = ({ size, children }) =>
  React.createElement(`h${size}`, { className: "title" }, children);

export const Columns: SFC = ({ children }) => (
  <div className="columns">{children}</div>
);

export const Column: SFC = ({ children }) => (
  <div className="column">{children}</div>
);

type TileSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface TileProps {
  isAncestor?: boolean;
  isParent?: boolean;
  isChild?: boolean;
  isVertical?: boolean;
  size?: TileSize;
}

export const TileContainer: SFC = ({ children }) => (
  <Tile isAncestor>{children}</Tile>
);

export const Tile: SFC<TileProps> = props => (
  <div
    className={classNames(
      "tile",
      {
        "is-ancestor": props.isAncestor,
        "is-parent": props.isParent,
        "is-child": props.isChild,
        "is-vertical": props.isVertical
      },
      props.size ? `is-${props.size}` : null
    )}
  >
    {props.children}
  </div>
);

export interface ButtonProps {
  onClick?: React.MouseEventHandler;
  className?: string;
  primary?: boolean;
}

export const Button: SFC<ButtonProps> = ({
  children,
  onClick,
  className,
  primary
}) =>
  React.createElement(
    "button",
    {
      className: classNames(className, "button", { "is-primary": primary }),
      onClick
    },
    children
  );
