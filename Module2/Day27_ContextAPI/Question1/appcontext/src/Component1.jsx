import { AppContext } from "./AppContext.jsx";
import Component2 from "./Component2.jsx";

const Component1 = () => {
  const values = {
    a: "Apple",
    b: "Ball",
    c: "Cat",
    d: "Dog",
    e: "Elephant",
    f: "Fish",
  };

  return (
    <AppContext.Provider value={values}>
      <Component2 />
    </AppContext.Provider>
  );
};

export default Component1;
