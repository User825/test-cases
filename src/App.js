import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import useStore from "./store";
import { Header } from './Header';

import './App.css';
import { Table } from "./Table";
import { Page404 } from "./Page404";

function App() {
  const initUser = useStore((state) => state.getUsers);
  const usersData = useStore((state) => state.users)
  const [isLoadingUsers, setLoadingStatus] = useState(true);

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    if (usersData.length > 0) {
      setLoadingStatus(false)
    }
  }, [usersData])

  return (
    <div className="App">
      <Header />
      <div className="content">
        {isLoadingUsers ? (<></>) : (
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route
                index
                path="/"
                element={<Navigate to="/1" replace={true} />}
              />
              <Route
                path=":page"
                element={<Table />}
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
