import { NavLink, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Page404 } from "../pages/Page404";
import { useUsersStore } from "../store"

const PAGE_USERS_QUANTITY = 10;

export const UsersSortList = () => {
  const usersData = useUsersStore((state) => state.users)
  const sortUp = useUsersStore((state) => state.sortUsersUp);
  const sortDown = useUsersStore((state) => state.sortUsersDown);
  const shuffle = useUsersStore((state) => state.shuffleUsers);
  const { page } = useParams();
  const pageNumber = parseInt(page);
  const maxPage = Math.ceil(usersData.length / PAGE_USERS_QUANTITY);
  const isDefectPage = Number.isNaN(pageNumber) || pageNumber === 0 || pageNumber > maxPage;

  if (isDefectPage) return <Page404 />

  const startIndex = pageNumber === 1 ? 0 : (pageNumber - 1) * PAGE_USERS_QUANTITY;
  const endIndex = pageNumber * PAGE_USERS_QUANTITY;
  const pageUsersData = usersData.slice(startIndex, endIndex);
  const paginationList = new Array(maxPage).fill(' ').map((_, index) => index + 1);

  return (
    <>
      <Header title="Users sort list" imgSrc="https://robohash.org/aliquamcumqueiure.png" hasBackButton/>
      <div className="content">
        <div className="usl_buttons">
          <button className="usl_buttons__unit" onClick={sortUp}>
            <img className="usl_buttons__icon" src={`${process.env.PUBLIC_URL}/assets/arrow-down.png`} alt="sort to down" />
          </button>
          <button className="usl_buttons__unit" onClick={sortDown}>
            <img className="usl_buttons__icon" src={`${process.env.PUBLIC_URL}/assets/arrow-up.png`} alt="sort to up" />
          </button>
          <button className="usl_buttons__unit" onClick={shuffle}>
            <img className="usl_buttons__icon" src={`${process.env.PUBLIC_URL}/assets/shuffle.png`} alt="shuffle" />
          </button>
        </div>
        <table className="usl_table">
          <thead>
            <tr className="usl_table__row table__row--head">
              <td className="usl_table__cell">id</td>
              <td className="usl_table__cell">firstName</td>
              <td className="usl_table__cell">lastName</td>
              <td className="usl_table__cell">email</td>
              <td className="usl_table__cell">avatar</td>
            </tr>
          </thead>
          <tbody>
            {
              pageUsersData.map(({ id, firstName, lastName, email, image }) => (
                <tr key={id} className="usl_table__row">
                  <td className="usl_table__cell" data-at="user-id">{id}</td>
                  <td className="usl_table__cell" >{firstName}</td>
                  <td className="usl_table__cell" >{lastName}</td>
                  <td className="usl_table__cell" >{email}</td>
                  <td className="usl_table__cell" ><img className="usl_table__avatar" src={image} alt={`${firstName} ${lastName} avatar`} /></td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
        <div className="usl_pagination">
          {paginationList.map((currentPage) => (
            <NavLink className="usl_pagination__button" key={currentPage} to={`/usersSortList/${currentPage}`}>
              {({ isActive }) =>
                <span className={isActive ? 'pagination__button--active' : undefined}>
                  {currentPage}
                </span>}
            </NavLink>)
          )}
        </div>
      </div>
    </>
  )
}
