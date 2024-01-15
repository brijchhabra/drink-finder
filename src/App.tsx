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
      
      <div className="flex flex-col items-center justify-around bg-gray-900 ">
      <h1 className="text-red-500 text-[200px]"> Fun Fun Fun </h1>
        <p> {drink?.strDrink} </p>
        <img src={drink?.strDrinkThumb} />
        
        <p className=" text-red-500"> {drink?.strInstructions} </p>
        <button onClick={clicked} className="text-red-500 outline-solid border rounded-lg m-20 outline.offset.2"> refresh </button>
        <p className=" text-red-600">You have refreshed {number} times</p>
      </div>
    </>
  );
}

export default App;
