import { Container, Typography, Button } from "@material-ui/core";
import { useForm } from "@ggf/ggf";

function App() {
  const { fields, handleSubmit } = useForm({ name: "User" });

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Update your profile
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        {fields.email}
        {fields.firstName}
        {fields.lastName}
        {fields.age}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default App;
