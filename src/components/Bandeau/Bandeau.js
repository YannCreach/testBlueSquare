/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Bandeau({
  currentProject, setCurrentProject, allProjects,
}) {
  return (
    <div className="flex justify-between px-20 h-20 items-center bg-[white] drop-shadow-sm z-10">

      <nav className="flex justify-between h-full items-center leading-[5] border-[#6360ec] text-[#6c717f]">
        <img src="/logo_hello.svg" alt="logo_hello" className="h-10 mr-10" />
        <NavLink
          to="/"
          className={({ isActive }) => (
            `border-b-2 mr-10 border-[transparent] ${isActive && '!border-[#6360ec]'}`
          )}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/taches"
          className={({ isActive }) => (
            `border-b-2 mr-10 border-[transparent] ${isActive && '!border-[#6360ec]'}`
          )}
        >
          Tâches
        </NavLink>
        <NavLink
          to="/tickets"
          className={({ isActive }) => (
            `border-b-2 mr-10 border-[transparent] ${isActive && '!border-[#6360ec]'}`
          )}
        >
          Tickets
        </NavLink>
        <NavLink
          to="/aide"
          className={({ isActive }) => (
            `border-b-2 mr-10 border-[transparent] ${isActive && '!border-[#6360ec]'}`
          )}
        >
          Centre d'aide
        </NavLink>
      </nav>
      <div className="flex items-center">
        <label htmlFor="project-input" className="mr-6 text-[#6c717f]">
          <select
            id="project-input"
            type="text"
            value={currentProject.name}
            className="p-2 rounded-lg border border-[#9EA5B1] bg-[white]"
            onChange={(event) => setCurrentProject(allProjects.find((project) => project.name === event.target.value))}
          >
            {(allProjects.length > 0) && allProjects.map((project, index) => (<option key={index}>{project.name}</option>))}
          </select>
        </label>
        <FontAwesomeIcon icon={faBell} className="h-8 text-[#6360ec] mr-6 cursor-pointer" />
        <img src="/portrait.png" onClick={() => localStorage.removeItem('token')} className="h-8 w-8 rounded-full cursor-pointer" alt="avatar_img" />
      </div>
    </div>
  );
}

Bandeau.propTypes = {
  currentProject: PropTypes.object.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  allProjects: PropTypes.array.isRequired,
};

export default Bandeau;
