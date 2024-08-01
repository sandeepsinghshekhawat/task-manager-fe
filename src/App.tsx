import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

const App: React.FC = () => {
  const handleTaskAdded = () => {
    // Reload screen when Task added
    window.location.reload();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" my={5}>
        Task Management Application
      </Typography>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList />
    </Container>
  );
};

export default App;
