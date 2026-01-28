import { useState } from 'react';

import Add from './components/Add/Add';
import Bar from './components/Bar/Bar';
import Favs from './components/Favs/Favs';
import AddModal from './components/Modal/AddModal';
// import ErrorModal from './components/Modal/ErrorModal';

const MyRole = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleAddRole = () => {
    setIsAddModalOpen(true);
  };

  // const handleErrorRole = () => {
  //   setIsErrorModalOpen(true);
  // };

  return (
    <div className="white-pageContainer">
      <Favs />
      <Bar />
      <Add onSubmit={handleAddRole} />

      <AddModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      {/* <ErrorModal open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} /> */}
    </div>
  );
};

export default MyRole;
