import { Container, Typography, Button } from "@material-ui/core";
import { Form, Field } from "@ggf/ggf";

function App() {
  const handleSubmit = ({ firstName, lastName }) => {
    alert(`Hello ${firstName} ${lastName}!`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Update your profile
      </Typography>

      <Form onSubmit={handleSubmit}>
        <Field name="email" label="Email" required />
        <Field name="firstName" label="First Name" />
        <Field name="lastName" label="Last Name" />
        <Field name="age" label="Age" numeric min="10" />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
