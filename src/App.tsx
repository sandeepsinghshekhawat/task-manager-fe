import React from "react";
import { Container, Typography } from "@mui/material";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" my={5}>
        Task Management Application
      </Typography>
      <TaskForm/>
      <TaskList />
    </Container>
  );
};

export default App;
