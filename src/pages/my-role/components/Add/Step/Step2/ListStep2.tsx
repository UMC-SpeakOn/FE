import type { JobItem } from '@/pages/my-role/types/add.type';

import ListCommon from '../Common/ListCommon';

interface ListStep2Props {
  data: JobItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep2 = ({ data, selectedId, onSelect }: ListStep2Props) => {
  return <ListCommon data={data} selectedId={selectedId} onSelect={onSelect} />;
};

export default ListStep2;
