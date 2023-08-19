import { format } from 'date-fns';

export function omitId(obj: any): any {
  const { id, ...rest } = obj;
  return rest;
}

export function omitIds(obj: any, ids: string[]): any {
  const rest = { ...obj };
  ids.forEach((id) => {
    delete rest[id];
  });
  console.log(rest);
  return rest;
}

export function formatDate(date: string) {
  // 날짜 및 시간 포맷팅 로직
  const formatDate = new Date(date);
  return format(formatDate, 'yyyy-MM-dd HH:mm:ss');
}

export function formatRoomSizeType(roomSize: number) {
  // 방 크기(종류) 포맷팅 로직
  if (roomSize > 0 && roomSize < 13.22314) {
    return '소형';
  } else if (roomSize >= 13.22314 && roomSize < 16.528926) {
    return '중형';
  } else if (roomSize >= 16.528926 && roomSize < 19.834711) {
    return '대형';
  } else if (roomSize >= 19.834711) {
    return '대형+';
  }
}

export function formatBuildingType(buildingType: string) {
  // 건물 유형 포맷팅 로직
  const buildingTypeMapping = {
    1: '단독주택',
    2: '오피스텔',
    3: '아파트',
    4: '빌라',
  };
  return buildingTypeMapping[buildingType];
}
