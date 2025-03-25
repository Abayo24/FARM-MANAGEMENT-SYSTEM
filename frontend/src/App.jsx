import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import CropsPage from "./pages/CropsPage";
import ResourcesPage from "./pages/ResourcesPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import CreateResourcePage from "./pages/CreateResourcePage";
import CreateActivity from "./pages/CreateActivity";

function App() {
  return (
      <Box minH={"100vh"}>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crops" element={<CropsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/createResource" element={<CreateResourcePage />} />
          <Route path="/createActivity" element={<CreateActivity />} />
        </Routes>
      </Box>
  );
}

export default App;
