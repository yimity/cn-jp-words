type SearchType = 1 | 2 | 3;

interface SearchItem {
  value: SearchType;
  label: string;
}

const searchTypeList: SearchItem[] = [
  {
    value: 1,
    label: '词义转移',
  },
  {
    value: 2,
    label: '词义扩大',
  },
  {
    value: 3,
    label: '词义缩小',
  },
];
