import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { useForm } from "@ggf/ggf";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  const { Form } = useForm({
    name: "User",

    afterSubmit({ firstName, lastName }) {
      alert(`Hello ${firstName} ${lastName}!`);
    },
  });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" gutterBottom>
        Update your profile
      </Typography>

      <Form />
    </Container>
  );
}

export default App;
