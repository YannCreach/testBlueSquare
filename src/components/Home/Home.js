import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const { REACT_APP_API_URL } = process.env;
  const [allCats, setAllCats] = useState([]);
  const [loadCat, setLoadCat] = useState(true);
  const [project, setProject] = useState('');

  const getCategories = async () => {
    try {
      const result = await fetch(`${REACT_APP_API_URL}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Requete GET ALL PROJECTS OK', result.data.categories);
      setAllCats(result.data.categories);
      setLoadCat(false);
    }
    catch (error) {
      console.log('Requete GET ALL PROJECTS NOK', error);
    }
  };

  const projectHandler = async (event) => {
    setProject(event);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-20 bg-[white] flex justify-between items-center drop-shadow-sm px-6">
        <p className="text-2xl">Dashboard</p>
        <Link to="/newTicket" className="flex justify-center items-center p-4 h-10 w-40 bg-[#4e3ee0] rounded-lg text-[white] cursor-pointer">Nouveau ticket</Link>
      </div>
    </div>
  );
}

export default Home;
