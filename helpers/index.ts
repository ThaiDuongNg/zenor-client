import { List } from 'interfaces';

export const convertToFormSelect = (
  list: List<any> | any = [],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false,
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === 'object' && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? 'None',
            value: el[fieldForValue] ?? '',
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: 'None', value: '' }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: 'None', value: '' }, ...list];
};

export const convertArtistsToString = (list: {name: string, link?: string}[]): string => {
  return list?.map((item) => `${item.name} ${item.link}`).join(' ').trim() || '';
}

export const renderStatus = (status: number) => {
  let text = "";
  switch (status) {
    case 0:
      text = "Đã xoá";
      break;
    case 1:
      text = "Nháp";
      break;
    case 2:
      text = "Đã gửi";
      break;
    case 3:
      text = "Cần chỉnh sửa";
      break;
    case 4:
      text = "Đang phát hành";
      break;
    case 5:
      text = "Đã phát hành";
      break;
    case 6:
      text = "Đang huỷ phát hành";
      break;
    case 7:
      text = "Đã phát hành";
      break;
    default:
      text = "No value found";
  }
  return text;
};


