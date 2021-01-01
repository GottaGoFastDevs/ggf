import React from "react";
import { Box, Button } from "@material-ui/core";

function DefaultForm({ fields, onSubmit }) {
  return (
    <form noValidate onSubmit={onSubmit}>
      {Object.values(fields)}

      <Box sx={{ mt: 2 }} />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}
export default DefaultForm;
