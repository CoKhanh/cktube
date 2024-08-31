import { useState } from "react";
import { Button } from "./ui/button";

const ClickMe = () => {
  const [label, setLabel] = useState('Click me');

  const handleClick = () => {
    setLabel('You clicked me!');
  };

  return (
    <Button onClick={handleClick}>Click</Button>
  )
}

export default ClickMe
