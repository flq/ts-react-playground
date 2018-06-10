import * as React from "react";
import { ActionItemsComponent, LinkItemsComponent } from "./ActionableItems";


export const UsingActions : React.SFC = () => (
    <ActionItemsComponent items={[{action: () => alert("Hallelujah"), label: "alerted" }]} />
);

export const UsingLinks : React.SFC = () => (
    <LinkItemsComponent items={[{link: "/#whatever", label: "whatever link" }]} />
);