import * as React from "react";
import { Section, Container, Header } from "./Components";
import { Examples } from "./ExamplesNavigator";

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
              { description: "Hello", component: Hello },
              { description: "World", component: World }
            ]}
          />
        </Container>
      </Section>
    );
  }
}

function Hello() {
  return <p>Hello</p>;
}
function World() {
  return <p>World</p>;
}

export default App;
