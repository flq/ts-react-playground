import * as React from "react";
import { Container, Button } from "../Components";

type ItemType = "action" | "link";

export interface ActionItem {
  label: string;
  action: () => any;
}

export interface LinkItem {
  label: string;
  link: string;
}

type ActionableItem<T extends ItemType> = T extends "action"
  ? ActionItem
  : T extends "link" ? LinkItem : never;

export interface ActionableItemComponentProps<T extends ItemType> {
  items: Array<ActionableItem<T>>;
}

class ActionableItemComponent<T extends ItemType> extends React.Component<
  ActionableItemComponentProps<T>
> {
  render() {
    const { items } = this.props;
    return (
      <Container>
        {(isActionsArray(items) && this.renderActionItems(items)) ||
          (isItemsArray(items) && this.renderLinkItems(items))}
      </Container>
    );
  }

  private renderActionItems(items: ActionItem[]) {
    return items.map((a, i) => (
      <Button key={i} onClick={a.action}>
        {a.label}
      </Button>
    ));
  }

  private renderLinkItems(items: LinkItem[]) {
    return items.map((a, i) => (
      <a key={i} href={a.link}>
        {a.label}
      </a>
    ));
  }
}


type ActionItemsComponent = new () => ActionableItemComponent<"action">;
export const ActionItemsComponent = ActionableItemComponent as ActionItemsComponent;

type LinkItemsComponent = new () => ActionableItemComponent<"link">;
export const LinkItemsComponent = ActionableItemComponent as LinkItemsComponent;


function isActionsArray(items: any[]): items is ActionItem[] {
  return items.length > 0 && items[0].action;
}

function isItemsArray(items: any[]): items is LinkItem[] {
  return items.length > 0 && items[0].link;
}
