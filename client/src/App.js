import {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import HomePage from "./pages/HomePage";
import TodoDetailPage from "./pages/TodoDetailPage";
import HeaderWave from "./components/HeaderWave";

export default function App() {
  return (
      <>
          <HeaderWave/>
              <nav className="app-nav">
                  <Link to="/" style={{marginRight: '1rem'}}>Home</Link>
                  <Link to="/todos" style={{marginRight: '1rem'}}>Todo</Link>
              </nav>
              <main className="class-main">
                  <Routes>
                      <Route path="/" element={<HomePage/>}/>
                      <Route path="/todos" element={<TodoPage/>}/>
                      <Route path="/todos/:id" element={<TodoDetailPage/>}/>

                  </Routes>
              </main>
          {/*</div>*/}
      </>
  )
}