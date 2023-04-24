/* eslint-disable import/no-extraneous-dependencies */
import { faCheck, faCircleQuestion, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TabHeader from '../../TabHeader/TabHeader';

function CreateTicket({ currentProject }) {
  const { REACT_APP_API_URL } = process.env;
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [link, setLink] = useState('');
  const [browser, setBrowser] = useState('');
  const [os, setOs] = useState('');
  const [type, setType] = useState('Problème technique');
  const [priority, setPriority] = useState('Faible');
  const [verification, setVerification] = useState(false);
  const redirect = useNavigate();

  const createTicket = async (event) => {
    event.preventDefault();

    if (!verification) return;

    try {
      const result = await axios.post(
        `${REACT_APP_API_URL}/ticket`,
        {
          title: title,
          type: type,
          description: description,
          context: context,
          priority: priority,
          project_id: currentProject.id,
          browser: browser,
          os: os,
          link: link,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('Requete CREATE TICKET OK', result);
      redirect(`/tickets/${result.data.data.id}`);
    }
    catch (error) {
      console.log('Requete CREATE TICKET NOK', error);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <TabHeader caption="Support" />

      <div className="flex flex-col items-center w-2/3">
        <p className="py-4 text-xl w-full">Nouveau ticket</p>
        <form
          className="bg-[white] flex flex-col rounded-lg  drop-shadow-md w-full"
          onSubmit={((event) => {
            createTicket(event);
          })}
        >
          <div className="flex flex-col p-6 ">
            <div className="flex w-full justify-between mb-6">
              <label htmlFor="type-input" className="w-1/2">
                <p className="mb-2">Type *</p>
                <select
                  id="type-input"
                  type="text"
                  value={type}
                  className="p-2 bg-[white] border border-[#9EA5B1] rounded-lg"
                  onChange={(event) => setType(event.target.value)}
                >
                  <option>Problème technique</option>
                  <option>Demande d'amélioration</option>
                  <option>Idée d'amélioration</option>
                </select>
              </label>

              <label htmlFor="priority-input" className="w-1/2">
                <p className="mb-2">Priorité *</p>
                <select
                  id="priority-input"
                  type="text"
                  value={priority}
                  className="mb-6 mr-2 p-2 bg-[white] border border-[#9EA5B1] rounded-lg"
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option>Faible</option>
                  <option>Moyenne</option>
                  <option>Haute</option>
                </select>
                <FontAwesomeIcon icon={faCircleQuestion} className="pt-2 h-5 text-[#4e3ee0]" />
              </label>

            </div>
            <label htmlFor="title-input" className="">
              <p className="mb-2">Titre *</p>
              <input
                required
                id="title-input"
                type="text"
                value={title}
                className="w-full mb-6 rounded-lg border border-[#9EA5B1] p-2"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label htmlFor="description-input" className="">
              <p className="mb-2 font-medium">Description *</p>
              <p className="mb-2 text-[#7e848d] font-light">Veuillez décrire au mieux le problème rencontré.</p>
              <textarea
                required
                id="description-input"
                type="text"
                value={description}
                className="w-full mb-6 rounded-lg border border-[#9EA5B1] p-2"
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>

            <label htmlFor="context-input" className="">
              <p>Contexte *</p>
              <p className="mb-2 text-[#7e848d] font-light">Veuillez décrire le contexte du problème.<br />
                Exemples : Utilisateur connecté, chemin emprunté jusqu'à la page, contenu du formulaire, etc.
              </p>
              <textarea
                required
                id="context-input"
                type="text"
                value={context}
                className="w-full mb-6 rounded-lg border border-[#9EA5B1] p-2"
                onChange={(event) => setContext(event.target.value)}
              />
            </label>

            <label htmlFor="link-input" className="">
              <p>Page concernée</p>
              <p className="mb-2 text-[#7e848d] font-light">Sur quelle page étiez-vous lorsque vous avez rencontré ce problème ?
              </p>
              <input
                id="link-input"
                type="text"
                value={link}
                placeholder="https://"
                className="w-full mb-6 rounded-lg border border-[#9EA5B1] p-2"
                onChange={(event) => setLink(event.target.value)}
              />
            </label>

            <div className="flex justify-between gap-4">
              <label htmlFor="browser-input" className="">
                <p>Navigateur *</p>
                <p className="mb-2 text-[#7e848d] font-light">Utilisé lors du problème rencontré.
                </p>
                <input
                  required
                  id="browser-input"
                  type="text"
                  value={browser}
                  placeholder="Chrome"
                  className="w-full mb-6 rounded-lg border border-[#9EA5B1] p-2"
                  onChange={(event) => setBrowser(event.target.value)}
                />
              </label>
              <label htmlFor="os-input" className="">
                <p>Système d'exploitation *</p>
                <p className="mb-2 text-[#7e848d] font-light">Utilisé lors du problème rencontré.
                </p>
                <input
                  required
                  id="os-input"
                  type="text"
                  value={os}
                  placeholder="MacOS"
                  className="w-full mb-6 rounded-lg border border-[#9EA5B1] p-2"
                  onChange={(event) => setOs(event.target.value)}
                />
              </label>
            </div>

            <div className="">
              <label
                htmlFor="upload-input"
                className="flex justify-center w-full h-32 px-4 transition bg-white border border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                onClick={() => document.getElementById('upload-input').click()}
              >
                <span className="flex flex-col justify-center items-center space-x-2">
                  <FontAwesomeIcon icon={faCloudArrowUp} className="my-2 h-5 text-[#7e848d]" />
                  <span className="font-medium text-[#7e848d] flex flex-col items-center">
                    <p>
                      <span className="text-[#4e3ee0]">Téléversez un fichier</span> ou glissez-déposez ici
                    </p>
                    <p className="text-xs">Fichier jusqu'à 10 Mo</p>
                  </span>

                </span>
                <input type="file" id="upload-input" name="file_upload" className="hidden" />
              </label>
            </div>

          </div>

          <div className="flex flex-row justify-between w-full bg-[#f8f9fa] rounded-bl-lg rounded-br-lg p-6">
            <label htmlFor="verification-input" className="flex justify-center items-center">
              <input
                required
                id="verification-input"
                type="checkbox"
                value={verification}
                className="h-4 rounded-lg border p-2"
                onChange={() => setVerification(!verification)}
              />
              <span className="ml-2">J'ai vérifié ou parviens à reproduire le problème signalé</span>
            </label>
            <button type="submit" className={`flex justify-center items-center p-4 h-10 rounded-lg ${verification ? 'bg-[#4e3ee0] text-[white]' : 'bg-[#7e848d] text-[#2c2e31] cursor-default'}  w-content`}><FontAwesomeIcon icon={faCheck} className={`h-5 ${verification ? 'text-[white]' : 'text-[#2c2e31]'} mr-6`} />Créer le ticket</button>
          </div>
        </form>
      </div>

    </div>
  );
}

CreateTicket.propTypes = {
  currentProject: PropTypes.object.isRequired,
};

export default CreateTicket;
