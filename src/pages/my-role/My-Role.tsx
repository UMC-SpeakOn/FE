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
    <div className="w-full h-full mt-[0.878rem] pt-[2.688rem] pl-[1.462rem] pb-[6.334rem] flex flex-col gap-[2.962rem] rounded-t-[3rem] bg-white">
      <Favs />
      <Bar />
      <Add onSubmit={handleAddRole} />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MyRole;
