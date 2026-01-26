
function Ui(){
    
    return(<>
    <div id="main"></div>
    <div className="navbar">
      <div className="nav-one" >
        <p>AgriNode</p>
        <img src="assets\Gemini_Generated_Image_eslq8beslq8beslq.png"></img>
      </div>
      <div className="nav-two">
        <input placeholder="Search AgriMore"></input>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="nav-three">
        <a href="#main" >Home</a>
        <a href="#Second-Section">Live Updates</a>
        <div className="nav-profile">
          <img src="assets\Gemini_Generated_Image_xg0xmzxg0xmzxg0x.png"></img>
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
            <img src="assets/polina-rytova-1dGMs4hhcVA-unsplash.jpg"></img>
            <div className="name">Wheat</div>
          </li>
          <li className="items two">
            <img src="assets/shelley-pauls-MSJMH0zW64c-unsplash.jpg"></img>
            <div className="name">Garlic</div>
          </li>
          <li className="items three">
            <img src="assets\engin-akyurt-Mpnv7-1mNzg-unsplash.jpg"></img>
            <div className="name">Onion</div>
          </li>
          <li className="items four">
            <img src="assets/sheikh-mohammad-fahim-DnazVet8pEM-unsplash.jpg"></img>
            <div className="name">Mustard</div>
          </li>
          <li className="items five">
            <img src="assets/soyabeen.webp"></img>
            <div className="name">Soyabean</div>
          </li>
          <li className="items six">
            <img src="assets/sandy-ravaloniaina-rARwqh9IXEE-unsplash.jpg"></img>
            <div className="name">Rice</div>
          </li>
        </ul>
      </div>
    </div>
    <hr id="Second-Section"></hr>
    </>)
}
export default Ui