import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { useForm } from "@ggf/ggf";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },

  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const { fields, handleSubmit } = useForm({ name: "User" });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" gutterBottom>
        Update your profile
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        {fields.email}
        {fields.firstName}
        {fields.lastName}
        {fields.age}

        <Button
          type="submit"
          variant="contained"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default App;
