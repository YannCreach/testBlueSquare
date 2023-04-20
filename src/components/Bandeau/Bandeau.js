import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Bandeau() {
  const { REACT_APP_API_URL } = process.env;
  const [allProjects, setAllProjects] = useState([]);
  const [loadProjects, setLoadProjects] = useState(true);
  const [currentProject, setCurrentProject] = useState('');

  const getProjects = async () => {
    try {
      const result = await fetch(`${REACT_APP_API_URL}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Requete GET ALL PROJECTS OK', result.data.categories);
      setAllProjects(result.data.categories);
      setLoadProjects(false);
    }
    catch (error) {
      console.log('Requete GET ALL PROJECTS NOK', error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="flex justify-between h-20 items-center bg-[white] drop-shadow-sm z-10">

      <nav className="flex justify-between p-6 h-20 items-center">
        <img src="https://img.freepik.com/vecteurs-libre/v813-aew-05_53876-166405.jpg?w=740&t=st=1681998086~exp=1681998686~hmac=f6deba6172f392f0dfb8d30258e79be602b873aaad03c716427aca4d6a082510" alt="logo_hello" className="h-20 mr-6" />
        <Link to="/" className="mr-6">
          Dashboard
        </Link>
        <Link to="/taches" className="mr-6">
          Tâches
        </Link>
        <Link to="/tickets" className="mr-6">
          Tickets
        </Link>
        <Link to="/aide">
          Centre d'aide
        </Link>
      </nav>
      <div className="flex mr-6">
        <label htmlFor="project-input" className="mr-6">
          <select
            id="project-input"
            type="text"
            value={currentProject}
            className="input-custom mb-6"
            onChange={(event) => setCurrentProject(event.target.value)}
          >
            {!loadProjects && allProjects.map((category, index) => (<option key={index}>{category.label}</option>))}
          </select>
        </label>
        <img src="https://cdn.icon-icons.com/icons2/2807/PNG/512/notification_bell_icon_178938.png" className="h-10 rounded-full mr-6" alt="notification_bell" />
        <img src="https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.587170984.1681998041&semt=ais" className="h-10 rounded-full" alt="avatar_img" />
      </div>
    </div>
  );
}

export default Bandeau;
