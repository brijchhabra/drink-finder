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
  const [list, setList] = useState<Drink[] | undefined>([])

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

  const loadDrink = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const drinkName = event.target.value;

    const drink = list?.find((drink) => drink.strDrink === drinkName);
    setDrink(drink);
  };

  const add = () => {
    if (!list || !drink) return;
    setList([...list, drink]);
    localStorage.setItem("List", JSON.stringify(list));
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center bg-slate-900 min-h-screen border-d">
        <h1 className="text-sky-600 text-8xl absolute top-20">Drink Finder</h1>
        <div className="flex">
          <img src={drink?.strDrinkThumb} className="w-72 mr-8 rounded-md shadow-lg"/>
          <div className="flex flex-col items-center bg-slate-800 rounded-md min-h-min">
            <h1 className="text-xl text-sky-400 text-center p-4">
              {drink?.strDrink}
            </h1>
            <p className="text-sky-300 w-72 mt-6 p-4">{drink?.strInstructions}</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-10 ">
          <button
            onClick={clicked}
            className="btn">
            refresh
          </button>
          <button className="btnRed order-3" onClick={add}>
            add To list
          </button>

          <select className="mt-10 bg-sky-400 text-slate-900 rounded-md border-slate-900" onChange={(event) => loadDrink(event)}>
            <option className="text-slate-900"disabled>
              Choose a old drink to add
            </option>
            {list?.map((drink) => <option key={drink.strDrink}>{drink.strDrink}</option>)}
          </select>
          
        </div>
        <p className="text-sky-300 relative top-6">You have refreshed {number} times</p>
      </div>
    </>
  );
}

export default App;
