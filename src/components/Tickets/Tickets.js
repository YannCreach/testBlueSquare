import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Tickets() {
  const { REACT_APP_API_URL } = process.env;
  const [allTickets, setAllTickets] = useState([]);
  const [loadTickets, setLoadTickets] = useState(true);
  const [type, setType] = useState('Problème technique');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [allTypes, setAllTypes] = useState(['Problème technique', 'Erreur numero 2', 'Erreur numero 3']);
  const [priority, setPriority] = useState('Faible');
  const [allPriorities, setAllPriorities] = useState(['Faible', 'Moyenne', 'Haute']);
  const [project, setProject] = useState('');

  const createTicket = async () => {
    try {
      const result = await fetch(`${REACT_APP_API_URL}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          title: title,
          type: type,
          description: description,
          context: context,
          priority: priority,
          projectid: project.id,
        },
      });

      console.log('Requete CREATE TICKET OK', result);
    }
    catch (error) {
      console.log('Requete CREATE TICKET NOK', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-20 bg-[white] flex justify-start items-center drop-shadow-sm">
        <p className="text-2xl ml-6">Support</p>
      </div>
      <div className="flex flex-col">
        <p className="py-4 text-xl">Nouveau ticket</p>
        <div className="bg-[white] rounded-lg drop-shadow-sm p-6 w-120 flex ">
          <div className="flex flex-col">
            <div className="flex w-full justify-between mb-6">
              <label htmlFor="type-input" className="">
                <p>Type *</p>
                <select
                  id="type-input"
                  type="text"
                  value={type}
                  className="p-2 border-[1px] bg-[white] border-[black] rounded-lg"
                  onChange={(event) => setType(event.target.value)}
                >
                  {allTypes.map((ticketType, index) => (<option key={index}>{ticketType}</option>))}
                </select>
              </label>

              <label htmlFor="priority-input" className="">
                <p>Priorité *</p>
                <select
                  id="priority-input"
                  type="text"
                  value={priority}
                  className="mb-6 p-2 border-[1px] bg-[white] border-[black] rounded-lg"
                  onChange={(event) => setPriority(event.target.value)}
                >
                  {allPriorities.map((ticketPriority, index) => (<option key={index}>{ticketPriority}</option>))}
                </select>
              </label>
            </div>
            <label htmlFor="title-input" className="">
              <p>Titre *</p>
              <input
                id="title-input"
                type="text"
                value={title}
                className="w-full mb-6 rounded-lg border-[1px] p-2"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label htmlFor="description-input" className="">
              <p>Description *</p>
              <p>Veuillez décrire au mieux le problème rencontré.</p>
              <textarea
                id="description-input"
                type="text"
                value={description}
                className="w-full mb-6 rounded-lg border-[1px] p-2"
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <label htmlFor="priority-input" className="">
              <p>Contexte *</p>
              <p>Veuillez décrire le contexte du problème.</p>
              <p>Exemples : Utilisateur connecté, chemin emprunté jusqu'à la page, contenu du formulaire, etc.</p>
              <textarea
                id="priority-input"
                type="text"
                value={context}
                className="w-full mb-6 rounded-lg border-[1px] p-2"
                onChange={(event) => setContext(event.target.value)}
              />
            </label>

            <div className="flex flex-row justify-between">
              <label htmlFor="validation-input" className="flex justify-center items-center">
                <input
                  id="validation-input"
                  type="checkbox"
                  value={type}
                  className="h-4 rounded-lg border-[1px] p-2"
                  onChange={(event) => setType(event.target.value)}
                />
                <span className="ml-2">J'ai vérifié ou parviens à reproduire le problème signalé</span>
              </label>
              <div className="flex justify-center items-center p-4 h-10 w-40 bg-[#4e3ee0] rounded-lg text-[white] cursor-pointer">Créer le ticket</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Tickets;
