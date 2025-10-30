import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Dispatch, SetStateAction } from 'react';

export type Order = 'title-asc' | 'title-desc' | 'release-asc' | 'release-desc';

interface SelectOrderProps {
  setOrder: Dispatch<SetStateAction<Order>>;
}

export const SelectOrder = ({ setOrder }: SelectOrderProps) => {
  return (
    <Select defaultValue="title-asc" onValueChange={e => setOrder(e as Order)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione a ordem" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="title-asc">Título (A-Z)</SelectItem>
          <SelectItem value="title-desc">Título (Z-A)</SelectItem>
          <SelectItem value="release-asc">Mais recentes</SelectItem>
          <SelectItem value="release-desc">Mais antigos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
