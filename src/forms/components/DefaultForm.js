import React from "react";
import { Box, Button } from "@material-ui/core";

function DefaultForm({ Fields, onSubmit }) {
  return (
    <form noValidate onSubmit={onSubmit}>
      {Object.values(Fields).map((Field, index) => (
        <Field key={index} />
      ))}

      <Box sx={{ mt: 2 }} />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}
export default DefaultForm;
