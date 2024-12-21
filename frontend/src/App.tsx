
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import BlankCategoryPage from "./pages/BlankCategory/BlankCategoryPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import PeoplePage from "./pages/PeoplePage/PeoplePage.tsx";
import SearchProvider  from "./context/SearchContext.tsx";
import { ModalsProvider } from "@mantine/modals";

function App() {
  return (
    <SearchProvider>
    <ModalsProvider>
    <Router>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/film" element={< BlankCategoryPage  categoryName="Film"/>} />
        <Route path="/planets" element={< BlankCategoryPage categoryName="Planets"/>} />
        <Route path="/species" element={< BlankCategoryPage categoryName="Species"/>} />
        <Route path="/vehicles" element={< BlankCategoryPage categoryName="Vehicles"/>} />
        <Route path="/starships" element={< BlankCategoryPage categoryName="Starships"/>} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
    </ModalsProvider>
    </SearchProvider>
  );
}

export default App;
