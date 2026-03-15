
function Ui(){
    
    return(<>
    <div id="main"></div>
    <div className="navbar">
      <div className="nav-one" >
        <p>AgriNode</p>
        <img src="assets\logo.png"></img>
      </div>
      <div className="nav-two">
        <input placeholder="Search AgriMore"></input>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="nav-three">
        <a href="#main" >Home</a>
        <a href="#Second-Section">Live Updates</a>
        <div className="nav-profile">
          <img src="assets\profile.png"></img>
          <p>Profile</p>
        </div>
      </div>
      <div className="mobile-nav-three"><i className="fa-solid fa-bars"></i></div>
    </div>
    <div className="hero">
      <div className="hero-one">
        <p><u>Live Trends in Market prices</u></p>
        <img src="assets\graph image.jpg"></img>
      </div>
      <div className="hero-two">
        <p>List of commodities covered as of now</p>
        <ul>
          <li className="items one">
            <img src="assets/wheat.jpg"></img>
            <div className="name">Wheat</div>
          </li>
          <li className="items two">
            <img src="assets/garlic.jpg"></img>
            <div className="name">Garlic</div>
          </li>
          <li className="items three">
            <img src="assets\onion.jpg"></img>
            <div className="name">Onion</div>
          </li>
          <li className="items four">
            <img src="assets/mustard.jpg"></img>
            <div className="name">Mustard</div>
          </li>
          <li className="items five">
            <img src="assets/soyabeen.webp"></img>
            <div className="name">Soyabean</div>
          </li>
          <li className="items six">
            <img src="assets/rice.jpg"></img>
            <div className="name">Rice</div>
          </li>
          <li className="items six">
            <img src="assets/Bengal-Gram.jpg"></img>
            <div className="name">Bengal Gram</div>
          </li>
          <li className="items six">
            <img src="assets\corn.jpg"></img>
            <div className="name">Maize</div>
          </li>
        </ul>
      </div>
    </div>
    <hr id="Second-Section"></hr>
    </>)
}
export default Ui