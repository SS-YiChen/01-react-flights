import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout';
import Home from './Home';
import ViewFlights from './ViewFlights';
import AddFlight from './AddFlight';
import UpdateFlight from './UpdateFlight';
import SearchFlight from './SearchFlight';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <Layout />
          }>
            {/* second route page*/}
            <Route index element={<Home />} />
            <Route path="/view" element={<ViewFlights />} />
            <Route path="/add" element={<AddFlight />} />
            <Route path="/update" element={<UpdateFlight />} />
            <Route path="/search" element={<SearchFlight />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
