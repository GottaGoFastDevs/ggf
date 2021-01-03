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
  const { handleSubmit, fields } = useForm({
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

      <form noValidate onSubmit={handleSubmit}>
        <fields.email label="Email address" />
        <fields.firstName label="First name" />
        <fields.lastName label="Last name" />
        <fields.age label="Age" />

        <Button variant="contained">Submit</Button>
      </form>
    </Container>
  );
}

export default App;
