import { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

interface Drink {
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
}

function App() {
  const [drink, setDrink] = useState<Drink | undefined>(undefined);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    async function getDrink() {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      setDrink(response.data.drinks[0]);
      console.log(response.data);
    }
    getDrink();
  }, [number]);

  const clicked = () => {
    setNumber(number + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-950 min-h-screen">
        <h1 className="text-sky-600 text-8xl absolute top-20">Drink Finder</h1>
        <div className="flex">
          <img src={drink?.strDrinkThumb} className="w-72 mr-8 rounded-md shadow-lg"/>
          <div className="flex flex-col items-center bg-gray-900 rounded-md min-h-min">
            <h1 className="text-xl text-sky-400 text-center p-4">
              {drink?.strDrink}
            </h1>
            <p className="text-sky-300 w-72 mt-6 p-4">{drink?.strInstructions}</p>
          </div>
        </div>

        <button
          onClick={clicked}
          className="btn">
          refresh
        </button>
        <p className="text-sky-300 relative top-6">You have refreshed {number} times</p>
      </div>
    </>
  );
}

export default App;
