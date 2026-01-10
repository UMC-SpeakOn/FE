import Favs from './components/Favs/Favs';
import Bar from './components/Bar/Bar';
import Add from './components/Add/Add';

const MyRole = () => {
  return (
    <div className="w-full h-full mt-[0.878rem] pt-[2.688rem] pl-[1.462rem] flex flex-col gap-[2.962rem] rounded-t-[3rem] bg-white">
      <Favs />
      <Bar />
      <Add />
    </div>
  );
};

export default MyRole;
