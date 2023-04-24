/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faChevronDown, faPenToSquare, faPencil, faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { logWording } from '../../utils/utils';
import TicketHeader from '../TicketHeader/TicketHeader';

function Ticket({ user }) {
  const { REACT_APP_API_URL } = process.env;

  const [ticket, setTicket] = useState({});
  const [loadTicket, setLoadTicket] = useState(true);
  const [activityLog, setActivityLog] = useState(
    [
      {
        id: 1,
        user: 'Cyprian Beauvois',
        action: 'create',
        newValue: '',
        date: '24/11/2020',
      },
      {
        id: 2,
        user: 'Cyprian Beauvois',
        action: 'type',
        newValue: 'Idée d\'amélioration',
        date: '25/11/2020',
      },
      {
        id: 3,
        user: 'Cyprian Beauvois',
        action: 'priority',
        newValue: 'Faible',
        date: '26/11/2020',
      },
      {
        id: 4,
        user: 'Maxime Renou',
        action: 'comment',
        newValue: 'Pour les status autres que "refusé", "En attente d\'info" ou "en attente de tests" qui envoient déjà automatiquement des mails',
        date: '27/11/2020',
      },
    ],
  );
  const { id } = useParams();

  const getTicket = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/ticket/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('Requete fetch TICKET OK', response.data.data);
      setTicket(response.data.data);
      setLoadTicket(false);
    }
    catch (error) {
      console.error('Une erreur est survenue lors de la requête fetch TICKET', error);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    !loadTicket && (
    <div className="flex w-full flex-col justify-center items-center">
      <TicketHeader ticket={ticket} user={user} setTicket={setTicket} />
      <div className="flex w-full justify-between pt-10 px-20 gap-4">

        {/* activity log */}
        <div className="w-[60%]">
          <div className="bg-[white] flex flex-col rounded-lg drop-shadow-md  text-[#434a5a]">
            <div className="p-4">
              {activityLog.map((log) => (
                <div className="flex justify-between w-full py-2" key={log.id}>
                  <div>{log.user + logWording(log.action) + log.newValue}</div>
                  <div className="flex gap-4 items-center">{log.date}{user.role === 'admin' && <FontAwesomeIcon icon={faTrashCan} className="h-3" />}</div>
                </div>
              )) }
            </div>
            <div className="flex flex-row gap-4 w-full bg-[#f8f9fa] rounded-bl-lg rounded-br-lg p-6">
              <Link to="/newTicket" className="flex justify-center items-center w-fit p-4 h-10 bg-[#4e3ee0] rounded-lg text-[white] cursor-pointer">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faPenToSquare} className="h-4" />
                  <p>Commenter</p>
                </div>
              </Link>
              <Link to="/newTicket" className="flex justify-center items-center w-fit p-4 h-10 bg-[white] rounded-lg text-[black] border border-[#434a5a] cursor-pointer">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faArrowUpFromBracket} className="h-4" />
                  <p>Envoyer un fichier</p>
                </div>
              </Link>
              <Link to="/newTicket" className="flex justify-center items-center w-fit p-4 h-10 bg-[white] rounded-lg border border-dashed border-[#6c717f] text-[#6c717f] cursor-pointer">
                <div className="flex items-center gap-4">
                  <p>Déposer un fichier</p>
                </div>
              </Link>
            </div>

          </div>
        </div>

        <div className="w-[40%] flex flex-col gap-4">

          {/* quick action */}
          {user.role === 'admin' && (
          <div className="bg-[white] w-full flex gap-4 rounded-lg drop-shadow-md p-4">
            <Link to="/newTicket" className="flex justify-center items-center w-1/2 p-4 h-10 bg-[#4e3ee0] rounded-lg text-[white] cursor-pointer">
              Créer une tâche
            </Link>
            <Link to="/newTicket" className="flex justify-center items-center w-1/2 p-4 h-10 bg-[white] rounded-lg text-[#434a5a] border border-[#434a5a] cursor-pointer">
              Assigner à une tâche
            </Link>
          </div>
          )}

          {/* ticket details */}
          <div className="bg-[white] flex flex-col gap-4 rounded-lg drop-shadow-md  ">

            {user.role === 'admin' && (
              <div className="border-b border-b-[#9da2ae] p-4">
                <div className="flex justify-between w-full">
                  <p className="text-[#6c717f] font-bold">Client.e notifié.e</p>
                  <div className="flex justify-center items-center w-content p-4 h-10 bg-[white] rounded-lg text-[#434a5a] border border-[#434a5a] cursor-pointer">
                    <FontAwesomeIcon icon={faPencil} className="h-4" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/portrait.png" alt="creator_portrait" className="h-10 rounded-full" />
                  <p className=""><b>Cyprian Beauvois</b><br /> <span className="text-[#6c717f]">cyprian@bluesquare.io</span></p>
                  <FontAwesomeIcon icon={faChevronDown} className="h-4" />
                </div>
              </div>
            )}

            <div className="border-b border-b-[#9da2ae] p-4">
              <div className="flex justify-between w-full">
                <p className="text-[#6c717f] font-bold">Description</p>
              </div>
              <p className="">
                Avoir la possibilité de notifier le client du changement d'état du ticket / ou bouton manuel<br />Choisir le collaborateur notifié
              </p>
            </div>

            <div className="border-b border-b-[#9da2ae] p-4">
              <div className="flex justify-between w-full">
                <p className="text-[#6c717f] font-bold">Page concernée</p>
              </div>
              <div className="">
                { ticket.Link ? ticket.Link : <p className="text-[#9da2ae]">Pas de lien précisé</p>}
              </div>
            </div>

            <div className="border-b border-b-[#9da2ae] p-4">
              <div className="flex justify-between w-full">
                <p className="text-[#6c717f] font-bold">Navigateur</p>
              </div>
              <p className="">
                {ticket.browser}
              </p>
            </div>

            <div className="border-b border-b-[#9da2ae] p-4">
              <div className="flex justify-between w-full">
                <p className="text-[#6c717f] font-bold">Système d'exploitation</p>
              </div>
              <p className="">
                {ticket.os}
              </p>
            </div>

            <div className="p-4">
              <div className="flex justify-between w-full">
                <p className="text-[#6c717f] font-bold">Pièces jointes</p>
              </div>
              <div className="">
                { ticket.file ? ticket.file : <p className="text-[#9da2ae]">Aucune pièce jointe ajoutée</p>}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    )
  );
}

Ticket.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Ticket;
