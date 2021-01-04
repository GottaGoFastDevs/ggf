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

### Create validation rules document
GottaGoFast needs a JSON document to know the validation rules of your data.

The rules follow the enforcing rules from Vest (https://ealush.com/vest/#/./enforce?id=list-of-enforce-rules)

```json
{
  "User": {
    "Age": {
      "greaterThan": 2
    }
  }
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

### Use fields

```jsx
function Form() {
  const { fields, handleSubmit } = useForm();

  <form noValidate onSubmit={handleSubmit}>
    <fields.firstName label="Prénom" />

    <Button type="submit">Envoyer</Button>
  </form>
}  
```

### Use  handler
```jsx
function Form() {
  const { fields: { firstName }, errors, handleSubmit } = useForm()

  return (
    <TextField onChange={firstname.handleChange} value={firstname.value} />
    <Typography>{errors.firstName?.message}</Typography>
  }
}
```
