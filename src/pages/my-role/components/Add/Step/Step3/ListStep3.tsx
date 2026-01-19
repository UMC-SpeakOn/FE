import { situationsData } from '@/mocks/addData';

import ListCommon from '../Common/ListCommon';

interface ListStep3Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep3 = ({ selectedId, onSelect }: ListStep3Props) => {
  return (
    <ListCommon
      data={situationsData}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  );
};

export default ListStep3;
