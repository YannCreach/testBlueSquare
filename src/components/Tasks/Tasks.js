import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TabHeader from '../../TabHeader/TabHeader';

function Tasks() {
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
    <div className="flex w-full flex-col justify-center items-center">
      <TabHeader caption="Tâches" />
      Tâches
    </div>

  );
}

export default Tasks;
