import { AppRoutes } from "./AppRoutes";
import { Nav, Footer } from "../src/Components"

function App() {
  return (
    <div className="App">
      <Nav/>
      <AppRoutes/>
      <Footer/>
    </div>
  );
}

export default App;