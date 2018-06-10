import * as React from "react";
import { Section, Container, Header } from "./Components";
import { Examples } from "./ExamplesNavigator";
import { UsingLinks, UsingActions } from "./examples/ActionableItemsExample";

class App extends React.Component {
  public render() {
    return (
      <Section>
        <Container>
          <Header size={1}>
            <a href="https://realfiction.net">Frank's</a> Typescript playground
          </Header>
          <Examples
            items={[
              { description: "Items as Links", component: UsingLinks },
              { description: "Items as Actions", component: UsingActions }
            ]}
          />
        </Container>
      </Section>
    );
  }
}

export default App;
