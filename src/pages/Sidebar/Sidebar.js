import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faHome, faRss,faEnvelope,faUsers,faTasks } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-72  flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Trello</h1>
        <ul className="mt-4">
        <li className="flex items-center py-2">
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Board
          </li>
      <li className="flex items-center py-2">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </li>
          <li className="flex items-center py-2">
            <FontAwesomeIcon icon={faRss} className="mr-2" />
            Feed
          </li>
          <li className="flex items-center py-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Email
          </li>
          <li className="flex items-center py-2">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Members
          </li>
          <li className="flex items-center py-2">
            <FontAwesomeIcon icon={faTasks} className="mr-2" />
            Task
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
