import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TicketList() {
  const { REACT_APP_API_URL } = process.env;
  const [allTickets, setAllTickets] = useState([]);
  const [loadTickets, setLoadTickets] = useState(true);

  const getTickets = async () => {
    try {
      const result = await fetch(`${REACT_APP_API_URL}/tickets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Requete GET ALL TICKETS OK', result.data);
      setAllTickets(result.data.categories);
      setLoadTickets(false);
    }
    catch (error) {
      console.log('Requete GET ALL TICKETS NOK', error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-20 bg-[white] flex justify-start items-center drop-shadow-sm">
        <p className="text-2xl ml-6">Tickets</p>
      </div>

    </div>

  );
}

export default TicketList;
