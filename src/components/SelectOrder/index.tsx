import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SelectOrder = () => {
  return (
    <Select defaultValue="title-asc">
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
