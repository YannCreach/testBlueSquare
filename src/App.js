import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import CreateTicket from './components/CreateTicket/CreateTicket';
import Bandeau from './components/Bandeau/Bandeau';
import TicketList from './components/TicketList/TicketList';
import Tasks from './components/Tasks/Tasks';
import Help from './components/Help/Help';
import Ticket from './components/Ticket/Ticket';
import Login from './components/Login/Login';

function App() {
  const { REACT_APP_API_URL } = process.env;
  const [allProjects, setAllProjects] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [loadProjects, setLoadProjects] = useState(true);
  const [loadTickets, setLoadTickets] = useState(true);
  const [currentProject, setCurrentProject] = useState({});
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Requete USER OK', response.data);
      setUser(response.data);
    }
    catch (error) {
      console.log('Requete USER NOK', error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/projects`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('Requête fetch ALL PROJECTS OK', response.data.data);
      setAllProjects(response.data.data);
      setCurrentProject(response.data.data[0]);
      setLoadProjects(false);
    }
    catch (error) {
      console.error('Une erreur est survenue lors de la requête fetch ALL PROJECTS', error);
    }
  };

  const getTickets = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/tickets?project=${currentProject.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('Requête fetch ALL TICKETS OK', response.data);
      setAllTickets(response.data.items);
      setLoadTickets(false);
    }
    catch (error) {
      console.error('Une erreur est survenue lors de la requête fetch ALL TICKETS', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) getUser();
  }, []);

  useEffect(() => {
    if (user) getProjects();
  }, [user]);

  useEffect(() => {
    if (user) getTickets();
  }, [currentProject]);

  return (
    user
      ? (
        !loadProjects && !loadTickets && (
        <div className="bg-[#f3f4f6] flex flex-col h-[100vh]">
          <Bandeau currentProject={currentProject} setCurrentProject={setCurrentProject} allProjects={allProjects} />
          <Routes>
            <Route path="/" element={<Home username={user.name} currentProject={currentProject} allTickets={allTickets} />} />
            <Route path="/taches" element={<Tasks currentProject={currentProject} />} />
            <Route path="/tickets" element={<TicketList currentProject={currentProject} allTickets={allTickets} getTickets={getTickets} />} />
            <Route path="/tickets/:id" element={<Ticket user={user} currentProject={currentProject} />} />
            <Route path="/aide" element={<Help />} />
            <Route path="/tickets/create" element={<CreateTicket currentProject={currentProject} />} />
          </Routes>
        </div>
        )
      )
      : <Login setUser={setUser} />
  );
}

export default App;
