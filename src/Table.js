import { NavLink, useParams } from "react-router-dom";
import { Page404 } from "./Page404";
import useStore from "./store"

const PAGE_USERS_QUANTITY = 10;

export const Table = () => {
  const usersData = useStore((state) => state.users)
  const sortUp = useStore((state) => state.sortUsersUp);
  const sortDown = useStore((state) => state.sortUsersDown);
  const shuffle = useStore((state) => state.shuffleUsers);
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
      <div className="buttons">
        <button className="buttons__unit" onClick={sortUp}>
          <img className="buttons__icon" src={`${process.env.PUBLIC_URL}/assets/arrow-down.png`} alt="sort to down" />
        </button>
        <button className="buttons__unit" onClick={sortDown}>
          <img className="buttons__icon" src={`${process.env.PUBLIC_URL}/assets/arrow-up.png`} alt="sort to up" />
        </button>
        <button className="buttons__unit" onClick={shuffle}>
          <img className="buttons__icon" src={`${process.env.PUBLIC_URL}/assets/shuffle.png`} alt="shuffle" />
        </button>
      </div>
      <table className="table">
        <thead>
          <tr className="table__row table__row--head">
            <td className="table__cell">id</td>
            <td className="table__cell">firstName</td>
            <td className="table__cell">lastName</td>
            <td className="table__cell">email</td>
            <td className="table__cell">avatar</td>
          </tr>
        </thead>
        <tbody>
          {
            pageUsersData.map(({ id, firstName, lastName, email, image }) => (
              <tr key={id} className="table__row">
                <td className="table__cell" data-at="user-id">{id}</td>
                <td className="table__cell" >{firstName}</td>
                <td className="table__cell" >{lastName}</td>
                <td className="table__cell" >{email}</td>
                <td className="table__cell" ><img className="table__avatar" src={image} alt={`${firstName} ${lastName} avatar`} /></td>
              </tr>
            )
            )
          }
        </tbody>
      </table>
      <div className="pagination">
        {paginationList.map((currentPage) => (
          <NavLink className="pagination__button" key={currentPage} to={`/${currentPage}`}>
            {({ isActive }) => 
              <span className={isActive ? 'pagination__button--active' : undefined}>
                {currentPage}
              </span>}
          </NavLink>)
        )}
      </div>
    </>
  )
}
