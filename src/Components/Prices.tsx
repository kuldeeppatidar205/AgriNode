import { useState, useRef, useEffect } from 'react'

export interface MarketRecord {
  State: string;
  District: string;
  Market: string;
  Commodity: string;
  Variety: string;
  Grade: string;
  Arrival_Date: string;
  Min_Price: number;
  Max_Price: number;
  Modal_Price: number;
}

export interface AgriDataResponse {
  records: MarketRecord[];
}

// Interface for the location JSON structure
interface LocationData {
  states: {
    state: string;
    districts: string[];
  }[];
}

function Prices() {
  const [records, setRecords] = useState<MarketRecord[]>([]);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);

  const [selectedState, setSelectedState] = useState("")
  const [district, setDistrict] = useState("")
  const [commodity, setCommodity] = useState("")
  const [date, setDate] = useState("")
  
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json")
      .then(res => res.json())
      .then(data => {
        setLocationData(data);
        setStates(data.states.map((s: any) => s.state));
      })
      .catch(err => console.error("Error loading location data:", err));
  }, []);

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setDistrict(""); 
    
    if (locationData) {
      const stateObj = locationData.states.find(s => s.state === stateName);
      setDistricts(stateObj ? stateObj.districts : []);
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    const priceA = Number(a.Max_Price);
    const priceB = Number(b.Max_Price);
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  useEffect(() => {
    if (records.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [records]); 

  async function getData() {
    const normalize = (value: string) =>
      value.trim().replace(/\b\w/g, c => c.toUpperCase());

    const encodedState = encodeURIComponent(selectedState);
    const encodedDistrict = encodeURIComponent(district);
    const encodedCommodity = encodeURIComponent(normalize(commodity));
    const encodedDate = encodeURIComponent(date || "");

    const url = `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd000001999369eb8b8349c357d0376723369f00&format=json&filters%5BState%5D=${encodedState}&filters%5BDistrict%5D=${encodedDistrict}&filters%5BCommodity%5D=${encodedCommodity}&filters%5BArrival_Date%5D=${encodedDate}`;
    await getMarketData(url);
  }

  async function getMarketData(url: string) {
    try {
      setIsLoading(true);
      setHasSearched(true);
      const response = await fetch(url);
      const data: AgriDataResponse = await response.json();
      if (data.records && data.records.length > 0) {
        setRecords(data.records);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await getData();
  }

  return (
    <>
      <p className='text-center pt-2 heading'>
        Enter the details to get the information of the prices of different commodities.
      </p>

      <form onSubmit={handleSubmit}>
        <div className='my-form'>
          <div>
            <select 
              className="input-form" 
              name="state" 
              value={selectedState}
              onChange={e => handleStateChange(e.target.value)}
              required
            >
              <option value="">Select a State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <select 
              className="input-form" 
              name="district" 
              value={district}
              onChange={e => setDistrict(e.target.value)}
              disabled={!selectedState}
              required
            >
              <option value="">Select a District</option>
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          <div>
            <input 
              className="input-form" 
              type="date" 
              name="date" 
              onChange={e => setDate(e.target.value)} 
            />
          </div>
          
          <div>
            <input 
              className="input-form" 
              placeholder="Enter Commodity" 
              type="text" 
              name="commodity" 
              autoComplete="off"
              onChange={e => setCommodity(e.target.value)} 
            />
          </div>
        </div>

        <div className='button-tag'>
          <button className='button' type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Submit"}
          </button>
        </div>
      </form>

      {records.length > 0 && (
        <div className='button-tag'>
          <button
            type="button" 
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="mb-4 px-3 py-1 border rounded"
          >
            Sort by Max Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
          </button>
        </div>
      )}

      {isLoading && <p className='info'>Loading market data...</p>}
      
      {!isLoading && hasSearched && records.length === 0 && 
        <h2 className='info'>No records found. Try adjusting your filters.</h2>
      }

      {!isLoading && records.length > 0 && (
        <div ref={resultsRef} className='flex justify-center mt-6'>
          <div className="w-full overflow-x-auto px-4">
            <table className="table-container table-auto w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th>Market</th>
                  <th>Commodity</th>
                  <th>Variety</th>
                  <th>Grade</th>
                  <th>Min Price</th>
                  <th>Max Price</th>
                  <th>Modal Price</th>
                </tr>
              </thead>
              <tbody>
                {sortedRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.Market}</td>
                    <td>{record.Commodity}</td>
                    <td>{record.Variety}</td>
                    <td>{record.Grade}</td>
                    <td>{record.Min_Price}</td>
                    <td>{record.Max_Price}</td>
                    <td>{record.Modal_Price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default Prices;