export const Header = () => {
  return (
    <header className="header">
      <img width="40" src={`${process.env.PUBLIC_URL}logo512.png`} alt="logo" />
      <h1 className="header__title">Users list</h1>
    </header>
  )
}
