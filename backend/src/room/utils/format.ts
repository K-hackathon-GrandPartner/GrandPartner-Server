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

export function formatRoomSizeTypeToNumber(roomSize: string) {
  // 방 크기(종류) 포맷팅 로직
  if (roomSize === '소형') {
    return [0, 13.22314];
  } else if (roomSize === '중형') {
    return [13.22314, 16.528926];
  } else if (roomSize === '대형') {
    return [16.528926, 19.834711];
  } else if (roomSize === '대형+') {
    return [19.834711, 100000];
  }
}

export function formatBuildingType(buildingType: number) {
  // 건물 유형 포맷팅 로직
  const buildingTypeMapping = {
    1: '단독주택',
    2: '오피스텔',
    3: '아파트',
    4: '빌라',
  };
  return buildingTypeMapping[buildingType];
}

export function formatBuildingTypeToNumber(buildingType: string) {
  // 건물 유형 포맷팅 로직
  const buildingTypeMapping = {
    '단독 주택': 1,
    오피스텔: 2,
    아파트: 3,
    빌라: 4,
  };
  return buildingTypeMapping[buildingType];
}

export function formatReligion(religion: number) {
  // 종교 포맷팅 로직
  console.log(religion);
  const religionMapping = {
    0: '상관 없음',
    1: '개신교',
    2: '불교',
    3: '천주교',
  };
  return religionMapping[religion];
}
