import { useState } from 'react';
import Favs from './components/Favs/Favs';
import Bar from './components/Bar/Bar';
import Add from './components/Add/Add';
import Modal from './components/Modal/Modal';

const MyRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddRole = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="white-pageContainer">
      <Favs />
      <Bar />
      <Add onSubmit={handleAddRole} />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MyRole;
