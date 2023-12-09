import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
import ArticlePage from "./article";
import Basket from "./basket";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default App;
