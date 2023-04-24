/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function TabHeader({ caption, btn }) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full h-20 bg-[white] flex justify-between items-center drop-shadow-sm px-20">
        <p className="text-2xl">{caption}</p>
        { btn
        && (
        <Link to="/tickets/create" className="flex justify-center items-center flex-nowrap p-4 h-10 bg-[#4e3ee0] rounded-lg text-[white] cursor-pointer">
          <FontAwesomeIcon icon={faFire} className="h-5 text-[white] mr-6" />Nouveau ticket
        </Link>
        )}
      </div>
    </div>
  );
}

TabHeader.propTypes = {
  caption: PropTypes.string.isRequired,
  btn: PropTypes.bool,
};

TabHeader.defaultProps = {
  btn: false,
};

export default TabHeader;
