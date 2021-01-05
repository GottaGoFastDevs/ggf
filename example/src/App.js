import { Container, Typography, Button } from "@material-ui/core";
import { useForm } from "@ggf/ggf";

const numberFormat = (str) => {
  let r = parseInt(str.replace(/[^\d]+/gi, ""), 10);
  r = r ? r.toLocaleString("fr") : "";

  return r;
};

function App() {
  const {
    Fields: { Email, FirstName, LastName, Age },
    handleSubmit,
  } = useForm();

  const onSubmit = ({ firstName, lastName }) => {
    alert(`Hello ${firstName} ${lastName}!`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Update your profile
      </Typography>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Email label="Email" required />
        <FirstName label="First Name" />
        <LastName label="Last Name" />
        <Age label="Age" numeric min="10" format={numberFormat} />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default App;
