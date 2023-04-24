/* eslint-disable import/no-extraneous-dependencies */
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCircleInfo, faClock, faLink, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { priorityColor, statusColor, typeColor } from '../../utils/utils';

function TicketHeader({ ticket, user, setTicket }) {
  const [action, setAction] = useState('Actions');
  const [newTicket, setNewTicket] = useState(ticket);
  const redirect = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const patchTicket = async () => {
    try {
      const result = await axios.patch(
        `${REACT_APP_API_URL}/ticket/${ticket.id}`,
        {
          title: newTicket.title,
          type: newTicket.type,
          status: newTicket.status,
          description: newTicket.description,
          context: newTicket.context,
          priority: newTicket.priority,
          project_id: newTicket.id,
          browser: newTicket.browser,
          os: newTicket.os,
          link: newTicket.link,
          creator_id: newTicket.creator_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('Requete PATCH TICKET OK', result);
      setTicket(newTicket);
    }
    catch (error) {
      console.log('Requete PATCH TICKET NOK', error);
    }
  };

  useEffect(() => {
    patchTicket();
  }, [newTicket]);

  const deleteTicket = async () => {
    try {
      const result = await axios.delete(
        `${REACT_APP_API_URL}/ticket/${ticket.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('Requete DELETE TICKET OK', result);
      redirect('/tickets');
    }
    catch (error) {
      console.log('Requete DELETE TICKET NOK', error);
    }
  };

  const handleAction = (event) => {
    setAction(event);
    if (event === 'Supprimer le ticket' && confirm('Etes-vous sûr de vouloir supprimer ce ticket ?')) deleteTicket();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full h-32 bg-[white] flex flex-col items-start justify-between drop-shadow-sm px-20 py-4">
        <p className="text-2xl font-bold">{ticket.title}</p>
        <div className="flex w-full justify-between">

          <div className="flex gap-4 items-center">
            <p className={`${statusColor(ticket.status)} px-4 text-left`}>{ticket.status}</p>
            <p className={`${typeColor(ticket.type)} px-4 text-left`}>{ticket.type}</p>
            <p className={`${priorityColor(ticket.priority)} px-4 text-left`}>{ticket.priority}</p>
            <p className="text-[#9da2ae]"><FontAwesomeIcon icon={faCalendar} className="h-5 mr-2" />{new Date(ticket.updated_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div to="/newTicket" className="flex justify-center items-center flex-nowrap p-4 h-10 bg-[white] rounded-lg text-[#434a5a] cursor-pointer border border-[#9da2ae]">
              <FontAwesomeIcon icon={faLink} className="h-5 mr-4" />Partager
            </div>
            {(user.role === 'admin') && (
              <>
                <div className="flex justify-center items-center flex-nowrap p-4 h-10 bg-[#4c5462] rounded-lg text-[white] cursor-pointer">
                  <FontAwesomeIcon icon={faCircleInfo} className="h-5 text-[white] mr-4" />Infos requises
                </div>
                {((ticket.status === 'Fermé') || (ticket.status === 'En attente'))
                && (
                <div onClick={() => setNewTicket({ ...ticket, status: 'Ouvert' })} className="flex justify-center items-center flex-nowrap p-4 h-10 bg-[#38946b] rounded-lg text-[white] cursor-pointer">
                  <FontAwesomeIcon icon={faClock} className="h-5 text-[white] mr-4" />Pris en charge
                </div>
                )}
                {((ticket.status === 'Ouvert') || (ticket.status === 'En attente'))
                && (
                <div onClick={() => setNewTicket({ ...ticket, status: 'Fermé' })} className="flex justify-center items-center flex-nowrap p-4 h-10 bg-[#d03e2a] rounded-lg text-[white] cursor-pointer">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="h-5 text-[white] mr-4" />Refuser
                </div>
                )}
              </>
            )}

            <label htmlFor="action-input" className="">
              <select
                id="action-input"
                type="text"
                value={action}
                className="p-2 rounded-lg border border-[#9da2ae] bg-[white] text-[#434a5a]"
                onChange={(event) => handleAction(event.target.value)}
              >
                <option disabled>Actions</option>
                <option>Supprimer le ticket</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

TicketHeader.propTypes = {
  ticket: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setTicket: PropTypes.func.isRequired,
};

export default TicketHeader;
