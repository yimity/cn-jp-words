import { WordType } from '../service/search/search.service';

interface SearchItem {
  value: WordType;
  label: string;
  color: string;
}

export const searchTypeList: SearchItem[] = [
  {
    value: 1,
    label: '词义转移',
    color: '#2db7f5',
  },
  {
    value: 2,
    label: '词义扩大',
    color: '#52c41a',
  },
  {
    value: 3,
    label: '词义缩小',
    color: '#00a2ae',
  },
];

export const typeColors = {
  0: searchTypeList[0].color,
  1: searchTypeList[0].color,
  2: searchTypeList[1].color,
  3: searchTypeList[2].color,
}
