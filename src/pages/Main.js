import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Header } from '../components/Header';

export const Main = () => {
  return (
    <>
      <Header title="Test cases" imgSrc={`${process.env.PUBLIC_URL}/assets/qa.png`} />
      <div className="content">
        <ul className="mp_link-box">
          {/* <li className="mp_link-item">
            <Link to="/usersSortList/">
              <Card text="Users sort list" imgSrc="https://robohash.org/aliquamcumqueiure.png" />
            </Link>
          </li>
          <li className="mp_link-item">
            <Link to="/gameStore/">
              <Card text="Game store" imgSrc={`${process.env.PUBLIC_URL}/assets/game-controller.png`} />
            </Link>
          </li> */}
          <li className="mp_link-item">
            <Link to="/marketCatalogue/">
              <Card text="Market Catalogue" imgSrc={`${process.env.PUBLIC_URL}/assets/market.png`} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
};

