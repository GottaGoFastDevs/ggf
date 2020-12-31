# GottaGoFast

GottaGoFast is a library that accelerates the development of your applications.

## Getting Started

### Install the package

```sh
npm install --save @ggf/ggf
```

### Create a GraphQL document

```graphql
type Planet {
  name: String
}
```

### Add a `GGFProvider`

```jsx
import { loader } from "graphql.macro";
import { GGFProvider } from "@ggf/ggf";

const graphQLDocument = loader("./document.graphql");

function App() {
  return (
    <GGFProvider graphQLDocument={graphQLDocument}>
      <Form />
    </GGFProvider>
  );
}
```

### Create a form

```jsx
import { useForm } from "@ggf/ggf";

function Form() {
  const { fields } = useForm({ name: "Planet" });

  return (
    <>
      {fields.name}
      
      <button type="submit">Submit</button>
    </>
  );
}
```
