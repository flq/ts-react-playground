import * as React from "react";
import { Container, Button } from "../Components";

type ActionableItemType = "action" | "link";
export interface ActionItem {
  label: string;
  action: () => any;
}

export interface LinkItem {
  label: string;
  link: string;
}

type ActionableItem<T extends ActionableItemType> = T extends "action"
  ? ActionItem
  : T extends "link" ? LinkItem : never;

interface ActionableItemComponentProps<T extends ActionableItemType> {
  items: Array<ActionableItem<T>>;
}

class ActionableItemComponent<T extends ActionableItemType> extends React.Component<
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


export const UsingActions : React.SFC = () => (
    <ActionItemsComponent items={[{action: () => alert("Hallelujah"), label: "alerted" }]} />
);

export const UsingLinks : React.SFC = () => (
    <LinkItemsComponent items={[{link: "/#whatever", label: "whatever link" }]} />
);