import { HalfWave } from "@components/halfwave";
import { Hero } from "@components/hero";
import { Navbar } from "@components/navbar";
import { End } from "@components/end";
import { Tickets } from "@components/tickets";

export function App() {
  return (<>
    <HalfWave name="app-top" direction="down" />
    
    <Hero />    
    <Navbar />
    <Tickets />

    <End />
  </>);
}

