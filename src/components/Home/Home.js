import PropTypes from 'prop-types';
import TabHeader from '../../TabHeader/TabHeader';

function Home({ username, currentProject, allTickets }) {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <TabHeader caption="Dashboard" btn />
      <div className="px-20 w-full">
        <div className="bg-[white] flex flex-col rounded-lg mt-20 drop-shadow-md">
          <div className="flex justify-start items-center p-10">
            <img src="/teamvector.png" alt="happy bluesquare employees" className="h-44" />
            <div className="ml-10">
              <p className="text-2xl">Hello <b>{username} !</b></p>
              <p className="mt-10 text-[#6c717f]">Bienvenue sur notre plateforme support.<br /> Nous sommes là pour vous accompagner dans le cadre du projet <b>{currentProject.name}</b></p>
            </div>
          </div>
          <div className="flex flex-col p-6 border-y border-y-[lightgrey] bg-[#f8f9fa]">
            <div className="flex justify-between font-bold text-[grey]">
              <div className="bg-[white] w-[30%] drop-shadow-md p-4 rounded-sm ">
                <p>Tickets en traitement</p>
                <p className="text-[#2746d3]">{allTickets.filter((ticket) => ticket.status === 'Ouvert').length}</p>
              </div>
              <div className="bg-[white] w-[30%] drop-shadow-md p-4 rounded-sm">
                <p>Tickets en attente</p>
                <p className="text-[#e25547]">{allTickets.filter((ticket) => ticket.status === 'En attente').length}</p>
              </div>
              <div className="bg-[white] w-[30%] drop-shadow-md p-4 rounded-sm">
                <p>Tickets traités</p>
                <p className="text-[#2746d3]">{allTickets.filter((ticket) => ticket.status === 'Fermé').length}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full rounded-bl-lg rounded-br-lg p-6">
            <div className="w-1/2 flex flex-col font-bold text-[grey]">
              <p className="mb-4">Vos contacts chez Bluesquare</p>
              <img src="/portrait.png" className="h-10 w-10 rounded-full" alt="avatar_img" />
            </div>
            <div className="w-1/2 flex flex-col font-bold text-[grey]">
              <p className="mb-4">Mon équipe sur Hello</p>
              <img src="/portrait.png" className="h-10 w-10 rounded-full" alt="avatar_img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  username: PropTypes.string.isRequired,
  currentProject: PropTypes.object.isRequired,
  allTickets: PropTypes.array.isRequired,
};

export default Home;
