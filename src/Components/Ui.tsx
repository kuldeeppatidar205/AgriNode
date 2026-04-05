import { useState } from 'react';
import Modal from './Modal'; // Ensure the path is correct (lowercase 'c')

function Ui() {
  // 1. State to store the details of the clicked item
  const [selectedCrop, setSelectedCrop] = useState<{ name: string; img: string } | null>(null);

  // Helper function to handle clicks
  const handleItemClick = (name: string, img: string) => {
    setSelectedCrop({ name, img });
  };

  return (
    <>
      <div id="main"></div>
      <div className="navbar">
        <div className="nav-one">
          <p>AgriNode</p>
          <img src="assets/logo.png" alt="Logo" />
        </div>
        <div className="nav-two">
          <input placeholder="Search AgriMore" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="nav-three">
          <a href="#main">Home</a>
          <a href="#Second-Section">Live Updates</a>
          <div className="nav-profile">
            <img src="assets/profile.png" alt="Profile" />
            <p>Profile</p>
          </div>
        </div>
        <div className="mobile-nav-three">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      <div className="hero">
        <div className="hero-one">
          <p><u>Trends in Market prices</u></p>
          <img src="assets/graph image.jpg" alt="Graph" />
        </div>

        <div className="hero-two">
          <p>List of commodities covered as of now</p>
          <ul>
            {/* 2. Added onClick handlers to your existing list items */}
            <li className="items one" onClick={() => handleItemClick("Wheat", "assets/wheat.jpg")}>
              <img src="assets/wheat.jpg" alt="Wheat" />
              <div className="name">Wheat</div>
            </li>
            <li className="items two" onClick={() => handleItemClick("Garlic", "assets/garlic.jpg")}>
              <img src="assets/garlic.jpg" alt="Garlic" />
              <div className="name">Garlic</div>
            </li>
            <li className="items three" onClick={() => handleItemClick("Onion", "assets/onion.jpg")}>
              <img src="assets/onion.jpg" alt="Onion" />
              <div className="name">Onion</div>
            </li>
            <li className="items four" onClick={() => handleItemClick("Mustard", "assets/mustard.jpg")}>
              <img src="assets/mustard.jpg" alt="Mustard" />
              <div className="name">Mustard</div>
            </li>
            <li className="items five" onClick={() => handleItemClick("Soyabean", "assets/soyabeen.webp")}>
              <img src="assets/soyabeen.webp" alt="Soyabean" />
              <div className="name">Soyabean</div>
            </li>
            <li className="items six" onClick={() => handleItemClick("Rice", "assets/rice.jpg")}>
              <img src="assets/rice.jpg" alt="Rice" />
              <div className="name">Rice</div>
            </li>
            <li className="items six" onClick={() => handleItemClick("Bengal Gram", "assets/Bengal-Gram.jpg")}>
              <img src="assets/Bengal-Gram.jpg" alt="Bengal Gram" />
              <div className="name">Bengal Gram</div>
            </li>
            <li className="items six" onClick={() => handleItemClick("Maize", "assets/corn.jpg")}>
              <img src="assets/corn.jpg" alt="Maize" />
              <div className="name">Maize</div>
            </li>
          </ul>
        </div>
      </div>

      <hr id="Second-Section"></hr>

      {/* 3. The Modal Component - Displays based on state */}
      <Modal isOpen={!!selectedCrop} onClose={() => setSelectedCrop(null)}>
        {selectedCrop && (
          <div className="text-center">
            <img src={selectedCrop.img} className="w-full h-84 object-cover" alt={selectedCrop.name} />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-black-700">{selectedCrop.name}</h2>
              <div className="mt-4 text-left border-t pt-4">
                <p className="text-gray-600 mt-4 italic">
                  Detailed analytics for {selectedCrop.name} in Mandsaur Mandi showing a steady trend.
                </p>
              </div>
              {/* <button 
                onClick={() => setSelectedCrop(null)}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition"
              >
                Close Insights
              </button> */}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Ui;