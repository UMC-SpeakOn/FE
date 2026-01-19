import { jobsData } from '@/mocks/addData';

import ListCommon from '../Common/ListCommon';

interface ListStep2Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep2 = ({ selectedId, onSelect }: ListStep2Props) => {
  return (
    <ListCommon data={jobsData} selectedId={selectedId} onSelect={onSelect} />
  );
};

export default ListStep2;
