import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/RelatedToGame/Game";
import SharedLayout from "./components/OutsideTheGame/SharedLayout";
import Home from "./components/OutsideTheGame/Home";
import Settings from "./components/RelatedToGame/GameSettings";
import Rules from "./components/OutsideTheGame/Rules";
import SharedAboutLayout from "./components/OutsideTheGame/SharedAboutLayout";
import AboutGame from "./components/OutsideTheGame/AboutGame";
import Images from "./components/OutsideTheGame/Images";
import SingleImg from "./components/OutsideTheGame/SingleImg";

import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game/:settings?" element={<Game />} />

        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/about-game" element={<SharedAboutLayout />}>
            <Route index element={<AboutGame />} />
            <Route path="/about-game/rules" element={<Rules />} />
            <Route path="/about-game/images" element={<Images />} />
            <Route path="/about-game/images/:name" element={<SingleImg />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
