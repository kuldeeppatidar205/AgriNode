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

function Prices() {
  const [records, setRecords] = useState<MarketRecord[]>([]);
  const [selectedState, setSelectedState] = useState("")
  const [district, setDistrict] = useState("")
  const [commodity, setCommodity] = useState("")
  const [date, setDate] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

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

    const encodedState = encodeURIComponent(normalize(selectedState));
    const encodedDistrict = encodeURIComponent(normalize(district));
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
        console.warn("No records found");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault(); // Prevents the page from reloading
  await getData();    // Calls your existing data fetching logic
}

  return (
    <>
      <p className=' text-center pt-2 heading'>
      Enter the details to get the information of the prices of different commodities.
    </p>

    <form onSubmit={handleSubmit} >
        <div className='my-form'>
      <div>
        <input className="input-form" placeholder="Enter State" type="text" name="state" onChange={e => setSelectedState(e.target.value)} />
      </div>
      <div>
        <input className="input-form"  placeholder="Enter District" type="text" name="district" onChange={e => setDistrict(e.target.value)} />
      </div>
      <div>
        <input className="input-form" placeholder="Enter Date" type="date" name="date" onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <input className="input-form"  placeholder="Enter Commodity" type="text" name="commodity" onChange={e => setCommodity(e.target.value)} />
      </div>
        </div>
      <div className='button-tag'>
        <button className='button' type="submit">Submit</button>
      </div>
    </form>

    <div className='button-tag'>
      <button
        type="button" 
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="mb-4 px-3 py-1 border rounded"
      >
        Sort by Max Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
      </button>
    </div>

      {isLoading && <p className='info'>Loading market data...</p>}
      
      {!isLoading && hasSearched && records.length === 0 && 
        <h2 className='info'>No records found with current details.</h2>
      }
      {!isLoading && records.length > 0 && (
        <div ref={resultsRef} className='flex justify-center mt-6'>
<div className="w-full overflow-x-auto px-4">
    <table className="table-container table-auto w-full border-collapse border border-black-800">
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
