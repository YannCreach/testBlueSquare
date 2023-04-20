import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Tickets from './components/Tickets/Tickets';
import Bandeau from './components/Bandeau/Bandeau';
import TicketList from './components/TicketList/TicketList';

function App() {
  return (
    <div className="h-[100vh] bg-[#f3f4f6]">

      <Routes>

        <Route
          path="/"
          element={(
            <div className="h-full flex flex-col">
              <Bandeau />
              <Home />
            </div>
          )}
        />
        <Route
          path="/tickets"
          element={(
            <div className="h-full flex flex-col">
              <Bandeau />
              <TicketList />
            </div>
          )}
        />

        <Route
          path="/newTicket"
          element={(
            <div className="h-full flex flex-col">
              <Bandeau />
              <Tickets />
            </div>
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <div className="h-full flex flex-col">
              <Bandeau />
              {/* <Dashboard /> */}
            </div>
          )}
        />
        <Route
          path="/taches"
          element={(
            <div className="h-full flex flex-col">
              <Bandeau />
              {/* <Taches /> */}
            </div>
          )}
        />
        <Route
          path="/aide"
          element={(
            <div className="h-full flex flex-col">
              <Bandeau />
              {/* <Aide /> */}
            </div>
          )}
        />
      </Routes>

    </div>
  );
}

export default App;
