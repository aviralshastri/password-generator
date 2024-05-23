import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PasswordGenerator(
  parameters = { number: true, upper: true, lower: true, special: true },
  range = 10
) {
  const uppers = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
  );
  const lowers = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 97)
  );
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
  const specials = [
    ...Array.from({ length: 15 }, (_, i) => String.fromCharCode(i + 33)),
    ...Array.from({ length: 7 }, (_, i) => String.fromCharCode(i + 58)),
    ...Array.from({ length: 6 }, (_, i) => String.fromCharCode(i + 91)),
    ...Array.from({ length: 4 }, (_, i) => String.fromCharCode(i + 123)),
  ];

  let chars = [];
  if (parameters.upper) chars = chars.concat(uppers);
  if (parameters.lower) chars = chars.concat(lowers);
  if (parameters.special) chars = chars.concat(specials);
  if (parameters.number) chars = chars.concat(numbers);
  if (range <= 3 || range >= 19) {
    alert("Invalid password length. (Length must be between 4 and 18)");
    return "Invalid password length.";
  }
  if (
    !parameters.number &&
    !parameters.upper &&
    !parameters.lower &&
    !parameters.special
  ) {
    alert("Please select at least one character type.");
    return "Please select at least one character type.";
  }
  let password = "";
  for (let i = 0; i < range; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

const Index = () => {
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [range, setRange] = useState(0);
  const [password, setPassword] = useState(
    "Genrated Password will be shown here"
  );
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

  const Genrate = () => {
    console.log(upper, lower, number, special, range);
    GenratePassword = PasswordGenerator(
      { number: number, upper: upper, lower: lower, special: special },
      range
    );
    if (
      GenratePassword === "Invalid password length." ||
      GenratePassword === "Please select at least one character type."
    ) {
      return NaN;
    } else {
      setPassword(GenratePassword);
      toast.info("Password Generated successfully! Now you can copy the password by clicking on the box.");}
  };
  const copyText = () => {
    navigator.clipboard.writeText(password);
    toast.info("Password Copied to Clipboard!");
  };
  return (
    <>
      <ToastContainer
        pauseOnHover={false}
        autoClose={2000}
        position="top-center"
        stacked={true} 
      />
      <div className="flex justify-center flex-col items-center min-h-screen shadow-2xl px-10">
        <div className="flex flex-col border border-solid w-full sm-w-3/5 md:w-4/5 lg:w-2/3 xl:w-1/2 items-center justify-center border-black p-8 m-4 rounded-xl shadow-2xl">
          <h1 className="text-3xl text-center font-bold mb-4">
            Password should include:
          </h1>
          <div className="flex flex-col justify-center">
            <label className="mb-2 text-xl items-center justify-center font-semibold">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5"
                onClick={handleUpperChange}
              />{" "}
              Upper Case Letters
            </label>
            <label className="mb-2 text-xl items-center justify-center font-semibold">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5"
                onClick={handleLowerChange}
              />{" "}
              Lower Case Letters
            </label>
            <label className="mb-2 text-xl items-center justify-center font-semibold">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5"
                onClick={handleNumberChange}
              />{" "}
              Numbers
            </label>
            <label className="mb-2 text-xl items-center justify-center font-semibold">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5"
                onClick={handleSpecialChange}
              />{" "}
              Special Characters
            </label>
          </div>
        </div>
        <div className="flex flex-col border items-center justify-center w-full sm-w-3/5 md:w-4/5 lg:w-2/3 xl:w-1/2 border-solid border-black rounded-xl p-8 m-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center ">
            <label className="text-xl h-full items-center justify-center font-semibold">
              <input
                type="number"
                className="h-10 w-16 border-2 flex flex-col border-gray-600 rounded-lg text-center items-center justify-center"
                max={50}
                onChange={handleRangeChange}
              />
              <h1 className="text-sm text-gray-900 font-normal text-center mt-2">
                Length
              </h1>
            </label>
            <div className="items-center justify-center">
              <button
                className="px-10 py-2 mx-2 h-full text-center items-center justify-center rounded-md bg-gray-100 text-gray-800 border-2 border-gray-200 font-bold"
                onClick={copyText}
              >
                {password}
              </button>
              <h1 className="text-sm text-gray-900 items-center justify-center text-center mt-2 break-words">
                Click above box to copy the password.
              </h1>
            </div>
            <div>
              <button
                className="px-10 py-2 mx-2 h-full rounded-md mt-2 sm:mt-0 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                onClick={Genrate}
              >
                Genrate
              </button>
              <h1 className="text-sm text-transparent text-center mt-2">
                dummy
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
