import {Route, Routes} from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import HeaderWave from "./components/HeaderWave";

export default function App() {
  return (
      <>
          <HeaderWave/>
              <main className="class-main">
                  <Routes>
                      <Route path="/" element={<TodoPage/>}/>
                      <Route path="/tasks/:id" element={<TodoDetailPage/>}/>
                  </Routes>
              </main>
          {/*</div>*/}
      </>
  )
}