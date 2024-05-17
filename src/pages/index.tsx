import React from "react";
import { useState } from "react";

function PasswordGenrator(
    parameters = { number: true, upper: true, lower: true, special: true },
    range = 10
  ) {
    var chars = [];
    var password = "";
    const uppers = [];
    const lowers = [];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const specials = [];
    for (let i = 33; i <= 47; i++) {
      specials.push(String.fromCharCode(i));
    }
    for (let i = 58; i <= 64; i++) {
      specials.push(String.fromCharCode(i));
    }
    for (let i = 91; i <= 96; i++) {
      specials.push(String.fromCharCode(i));
    }
    for (let i = 123; i <= 126; i++) {
      specials.push(String.fromCharCode(i));
    }
    for (let i = 65; i <= 90; i++) {
      uppers.push(String.fromCharCode(i));
    }
    for (let i = 97; i <= 122; i++) {
      lowers.push(String.fromCharCode(i));
    }
    if (parameters.upper) chars = chars.concat(uppers);
    if (parameters.lower) chars = chars.concat(lowers);
    if (parameters.special) chars = chars.concat(specials);
    if (parameters.number) chars = chars.concat(numbers);
    if (range < 4)
      {console.log(range)
      alert("Invalid password length.")
      return "Invalid password length.";
    };
    for (let i = 1; i <= range; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password = password + chars[randomIndex];
    }
    if (!parameters.number && !parameters.upper && !parameters.lower && !parameters.special) {alert("Please select atleast one option.")
        return "Please select atleast one option from above."
    }
    return password;
  }

const Index = () => {
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [range, setRange] = useState(0);
  const [password, setPassword] = useState("Genrated Password will be shown here");
  let GenratePassword;

  const handleUpperChange = () => {
    setUpper(!upper);
  };

  const handleLowerChange = () => {
    setLower(!lower);
  };

  const handleNumberChange = () => {
    setNumber(!number);
  };

  const handleSpecialChange = () => {
    setSpecial(!special);
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const Genrate=()=>{
    console.log(upper,lower,number,special,range)
    GenratePassword=PasswordGenrator({number:number,upper:upper,lower:lower,special:special},range)
    setPassword(GenratePassword)
  }
  const copyText = () => {
    navigator.clipboard.writeText(password)
  }
  return (
    <div className="flex justify-center flex-col items-center min-h-screen shadow-2xl px-10">
      <div className="flex flex-col border border-solid w-full sm-w-3/5 md:w-2/3 lg:w-1/2  items-center justify-center border-black p-8 m-4 rounded-xl shadow-2xl">
        <h1 className="text-3xl text-center font-bold mb-4">Password should include:</h1>
        <div className="flex flex-col justify-center">
          <label className="mb-2 text-xl items-center justify-center font-semibold">
            <input type="checkbox" className="mr-2 w-5 h-5" onClick={handleUpperChange} /> Upper Case
            Letters
          </label>
          <label className="mb-2 text-xl items-center justify-center font-semibold">
            <input type="checkbox" className="mr-2 w-5 h-5" onClick={handleLowerChange} /> Lower Case
            Letters
          </label>
          <label className="mb-2 text-xl items-center justify-center font-semibold">
            <input type="checkbox" className="mr-2 w-5 h-5" onClick={handleNumberChange} /> Numbers
          </label>
          <label className="mb-2 text-xl items-center justify-center font-semibold">
            <input type="checkbox" className="mr-2 w-5 h-5" onClick={handleSpecialChange}/> Special
            Characters
          </label>
        </div>
      </div>
      <div className="flex flex-col border items-center justify-center w-full sm-w-3/5 md:w-2/3 lg:w-1/2 border-solid border-black rounded-xl p-8 m-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center ">
        <label className="text-xl h-full items-center justify-center font-semibold">
        <input type="number" className="h-10 w-16 border-2 flex flex-col border-gray-600 rounded-lg text-center items-center justify-center" max={50} onChange={handleRangeChange}/>
          <h1 className="text-sm text-gray-900 font-normal text-center mt-2">Length</h1>
          </label>
        <div className="items-center justify-center">
          <button className="px-10 py-2 mx-2 h-full items-center justify-center rounded-md bg-gray-100 text-gray-800 border-2 border-gray-200 font-bold" onClick={copyText}>
            {password}
          </button>
          <h1 className="text-sm text-gray-900 items-center justify-center text-center mt-2">Click above box to copy the password.</h1>
          </div>
          <div>
          <button className="px-10 py-2 mx-2 h-full rounded-md mt-2 sm:mt-0 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600" onClick={Genrate}>
            Genrate
          </button>
          <h1 className="text-sm text-transparent text-center mt-2">dummy</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;