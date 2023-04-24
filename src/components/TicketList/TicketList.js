/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import TabHeader from '../../TabHeader/TabHeader';
import {
  typeColor, statusColor, priorityColor,
} from '../../utils/utils';

function TicketList({ allTickets, getTickets }) {
  const [statusFilter, setStatusFilter] = useState('Tous les status');
  const [filteredList, setFilteredList] = useState(allTickets);
  const [typeFilter, setTypeFilter] = useState('Tous les types');
  const [dateOrder, setDateOrder] = useState('Date de création');

  const listFilter = (type, status, orderBy) => {
    const OrderedFilteredList = allTickets.filter((ticket) => {
      if (type === 'Tous les types' && status === 'Tous les status') return true;
      if (type === 'Tous les types' && ticket.status === status) return true;
      if (status === 'Tous les status' && ticket.type === type) return true;
      if (ticket.type === type && ticket.status === status) return true;
      return false;
    });

    if (orderBy === 'Date de création') {
      OrderedFilteredList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    else if (orderBy === 'Dernière activité') {
      OrderedFilteredList.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at)).reverse();
    }

    setFilteredList(OrderedFilteredList);
  };

  const handleChangeTypeFilter = (type) => {
    setTypeFilter(type);
    listFilter(type, statusFilter, dateOrder);
  };

  const handleChangeStatusFilter = (status) => {
    setStatusFilter(status);
    listFilter(typeFilter, status, dateOrder);
  };

  const handleChangeOrderBy = (orderBy) => {
    setDateOrder(orderBy);
    listFilter(typeFilter, statusFilter, orderBy);
  };

  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    setFilteredList(allTickets);
  }, [allTickets]);

  return (
    <div className="flex w-full flex-col justify-center items-center">

      <TabHeader caption="Tickets" btn />

      {/* Filters */}
      <div className="flex w-full justify-between p-10">
        <div className="flex items-center">
          <p>Afficher les tickets </p>
          <label htmlFor="status-input" className="mx-4">
            <select
              id="status-input"
              type="text"
              value={statusFilter}
              className="p-2 rounded-lg border border-[#9EA5B1] bg-[white]"
              onChange={(event) => handleChangeStatusFilter(event.target.value)}
            >
              <option>Tous les status</option>
              <option>Ouvert</option>
              <option>Fermé</option>
              <option>En attente</option>
            </select>
          </label>
          <p>et</p>
          <label htmlFor="type-input" className="ml-4">
            <select
              id="type-input"
              type="text"
              value={typeFilter}
              className="p-2 rounded-lg border border-[#9EA5B1] bg-[white]"
              onChange={(event) => handleChangeTypeFilter(event.target.value)}
            >
              <option>Tous les types</option>
              <option>Problème technique</option>
              <option>Idée d'amélioration</option>
              <option>Demande d'amélioration</option>
            </select>
          </label>
        </div>
        <div className="flex items-center">
          <p>Trier par </p>
          <label htmlFor="dateOrder-input" className="mx-4">
            <select
              id="dateOrder-input"
              type="text"
              value={dateOrder}
              className="p-2 rounded-lg border border-[#9EA5B1] bg-[white]"
              onChange={(event) => handleChangeOrderBy(event.target.value)}
            >
              <option>Date de création</option>
              <option>Dernière activité</option>
            </select>
          </label>
          <p>{allTickets.length} ticket{allTickets.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Ticket list */}
      <div className="px-10 w-full">
        <div className="bg-[white] flex flex-col rounded-lg drop-shadow-md">
          <table className="w-full table-fixed rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#f9fafb] rounded-lg border-b border-[#e5e7eb] text-[#7b7f8c]">
                <th className="w-10 py-3 px-4 text-left font-bold rounded-tl-lg">#</th>
                <th className="w-64 py-3 px-4 text-left font-bold">TYPE</th>
                <th className="py-3 px-4 text-left font-bold">TITRE</th>
                <th className="w-32 py-3 px-4 text-left font-bold">STATUS</th>
                <th className="w-32 py-3 px-4 text-left font-bold">PRIORITÉ</th>
                <th className="w-32 py-3 px-4 text-left font-bold">DERNIÈRE ACTIVITÉ</th>
                <th className="w-48 py-3 px-4 text-left font-bold"> </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0
                ? filteredList.map((ticket, index) => (
                  <tr key={ticket.id} className={`h-20 ${index < filteredList.length - 1 ? 'border-b border-[#e5e7eb]' : ''} hover:bg-gray-50`}>
                    <td className="px-4 text-left text-[#6360ec]">{ticket.id}</td>
                    <td className="px-4 text-left"><p className={`${typeColor(ticket.type)} px-4 text-left`}>{ticket.type}</p></td>
                    <td className="px-4 text-left">{ticket.title}</td>
                    <td className="px-4 text-left"><p className={`${statusColor(ticket.status)} px-4 text-left`}>{ticket.status}</p></td>
                    <td className="px-4 text-left"><p className={`${priorityColor(ticket.priority)} px-4 text-left`}>{ticket.priority}</p></td>
                    <td className="px-4 text-left">{new Date(ticket.updated_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                    <td className="px-4 text-left text-[#6c717f]">
                      <Link to={`/tickets/${ticket.id}`} className="flex justify-center items-center p-4 h-10 bg-[white] border border-[#6c717f] rounded-lg cursor-pointer">
                        <FontAwesomeIcon icon={faEye} className="h-5 mr-6" />Consulter
                      </Link>
                    </td>
                  </tr>
                ))
                : <tr><td colSpan={7} className=""><p className="flex w-full justify-center py-3">Pas de ticket pour ce projet</p></td></tr>}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

TicketList.propTypes = {
  allTickets: PropTypes.array.isRequired,
  getTickets: PropTypes.func.isRequired,
};

export default TicketList;
