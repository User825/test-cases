import { useState } from "react"
import { Header } from "../components/Header"
import { useGameStore } from "../store";

const ALLOWED_INPUT_VALUES = /(^\d|-)\d*$/;
const LOWEST_RATE_AGE = 1;
const LOW_RATE_AGE = 14;
const MEDIUM_RATE_AGE = 16;
const HIGH_RATE_AGE = 18;
const MAX_AGE = 99;

const getRateText = (rate) => {
  switch (rate) {
    case 'lowest':
      return `${LOWEST_RATE_AGE}+`;
    case 'low':
      return `${LOW_RATE_AGE}+`;
    case 'medium':
      return `${MEDIUM_RATE_AGE}+`;
    case 'high':
      return `${HIGH_RATE_AGE}+`;
  }
}

export const GameStore = props => {
  const [inputValue, setInputValue] = useState('');
  const [gamesRate, setGamesRate] = useState([]);
  const gamesData = useGameStore((state) => state.games)

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const numberValue = parseInt(value);
    const isInvalidValue = !(ALLOWED_INPUT_VALUES.test(value));

    if (value === '') {
      setInputValue(value);
      return;
    }

    if (isInvalidValue) return;

    if (numberValue > MAX_AGE || numberValue === 0) return;

    setInputValue(value);
  }

  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!inputValue) {
      setGamesRate([]);
    };

    if (inputValue < 0 || inputValue >= HIGH_RATE_AGE) {
      setGamesRate(['high', 'medium', 'low', 'lowest']);
    }

    if (inputValue >= LOWEST_RATE_AGE && inputValue < LOW_RATE_AGE) {
      setGamesRate(['lowest']);
    }

    if (inputValue >= LOW_RATE_AGE && inputValue < MEDIUM_RATE_AGE) {
      setGamesRate(['low', 'lowest']);
    }

    if (inputValue >= MEDIUM_RATE_AGE && inputValue < HIGH_RATE_AGE) {
      setGamesRate(['medium', 'low', 'lowest']);
    }
  }

  return (
    <>
      <Header title="Games Store" imgSrc={`${process.env.PUBLIC_URL}/assets/game-controller.png`} hasBackButton />
        <form className="gs_form" onSubmit={handleSubmit}>
          <p className="gs_form__desc">Age</p>
          <input className="gs_form__input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter you age" />
          <button className="gs_form__button" type="submit">Ок</button>
        </form>
        <div className="content gs__divider">
        <ul className="gs_list">
          {gamesData.map(({title, thumbnail, rate, id }) => {
            if (!gamesRate.includes(rate)) return null;

            return (
              <li key={id} className="gs_list__item">
                <div className="gs_card">
                  <img className="gs_card__img" src={thumbnail} alt={`${title} poster` } />
                  <div className="gs_card__footer">
                    <h3 className="gs_card__title">{title}</h3>
                    <span className="gs_card__rate">{getRateText(rate)}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
