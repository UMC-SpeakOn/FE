import type { SituationItem } from '@/pages/my-role/types/myrole.type';

import ListCommon from '../Common/ListCommon';

interface ListStep3Props {
  data: SituationItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep3 = ({ data, selectedId, onSelect }: ListStep3Props) => {
  return <ListCommon data={data} selectedId={selectedId} onSelect={onSelect} />;
};

export default ListStep3;
