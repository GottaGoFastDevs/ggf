# GottaGoFast

GottaGoFast is a library that accelerates the development of your applications.

## Getting Started

### Install the package

```sh
npm install --save @ggf/ggf
```

### Create a form

```jsx
import { useForm } from "@ggf/ggf";

function Form() {
  const { Fields, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // ...
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Fields.FirstName label="First Name" />
      <Fields.LastName label="Last Name" />

      <Button type="submit">Submit</Button>
    </form>
  );
}
```
