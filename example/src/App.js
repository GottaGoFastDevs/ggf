import { Container, Typography } from "@material-ui/core";
import { useForm } from "@ggf/ggf";

function App() {
  const { fields } = useForm({ name: "User" });

  console.log(fields);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Modifier votre profil
      </Typography>

      {fields.email}
      {fields.firstName}
      {fields.lastName}
    </Container>
  );
}

export default App;
