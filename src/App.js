// import { useEffect, useState } from "react";
import { Routes, Navigate, Route } from "react-router-dom";

// import { useUsersStore, useGameStore } from "./store";

import { Main } from "./pages/Main";
// import { GameStore } from "./pages/GameStore";
// import { UsersSortList } from "./pages/UsersSortList";
import { MarketCatalogue } from "./pages/MarketCatalogue";
import { Page404 } from "./pages/Page404";

import './App.css';


function App() {
  // const initUser = useUsersStore((state) => state.getUsers);
  // const usersData = useUsersStore((state) => state.users)
  // const initGames = useGameStore((state) => state.getGames)
  // const gamesData = useGameStore((state) => state.games)
  // const [isLoadingUsers, setLoadingStatus] = useState(true);

  // useEffect(() => {
  //   initUser();
  //   initGames();
  // }, [initUser, initGames]);

  // useEffect(() => {
  //   if (usersData.length > 0 || gamesData.length > 0) {
  //     setLoadingStatus(false)
  //   }
  // }, [usersData, gamesData])

  return (
    <div className="App">
      {/* {isLoadingUsers ? (<></>) : ( */}
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />
          {/* <Route
            path="/usersSortList/"
            element={<Navigate to="/usersSortList/1" replace={true} />}
          />
          <Route
            path="/usersSortList/:page"
            element={<UsersSortList />}
          />
          <Route
            path="/gameStore/"
            element={<GameStore />}
          /> */}
          <Route
            path="/marketCatalogue/"
            element={<MarketCatalogue />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      {/* )} */}
    </div>
  );
}

export default App;
