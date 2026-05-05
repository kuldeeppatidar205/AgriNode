import { SpeedInsights } from "@vercel/speed-insights/react"
import Prices from "./Components/Prices"
import Ui from "./Components/Ui"
import Footer from "./Components/Footer"
function App(){
  return(<>
  <Ui/>
  <Prices/>
  <Footer/>
  <SpeedInsights />
  <div></div>
  </>)
}
export default App