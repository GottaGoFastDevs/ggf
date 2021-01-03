# GottaGoFast

GottaGoFast is a library that accelerates the development of your applications.

## Getting Started

### Install the package

```sh
npm install --save @ggf/ggf
```

### Create a GraphQL document

GottaGoFast needs a GraphQL document to know the structure of your data.

```graphql
type Planet {
  name: String
}
```

### Add a `GGFProvider`

All GottaGoFast hooks and components need a `GGFProvider` in the parent tree to work.

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
  const { form } = useForm({ name: "Planet" });

  return <form />;
}
```
