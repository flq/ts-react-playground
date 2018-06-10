import * as React from "react";
import { Button, Section } from "./Components";

export interface ExamplesState {
  currentExample: number | null;
}

export interface ExamplesProps {
  items: Array<{ description: string; component: React.ComponentType }>;
}

export class Examples extends React.Component<ExamplesProps, ExamplesState> {
  constructor(props: ExamplesProps) {
    super(props);
    this.state = { currentExample: null };
  }

  render() {
    return (
      <>
        <nav className="level">
          <span className="level-item" >Examples:</span>
          {this.props.items.map((item, i) => (
            <Button
              key={i}
              primary={i === this.state.currentExample}
              className="level-item"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => this.setState({ currentExample: i })}
            >
              {item.description}
            </Button>
          ))}
        </nav>
        <Section>
          {this.state.currentExample === null
            ? null
            : React.createElement(
                this.props.items[this.state.currentExample].component
              )}
        </Section>
      </>
    );
  }
}
