export function formatLoginType(loginType: string): number {
  // 건물 유형 포맷팅 로직
  const loginTypeMapping = {
    kakao: 1,
    phone: 2,
  };
  return loginTypeMapping[loginType];
}

export function formatReligion(religion: string): number {
  // 종교 포맷팅 로직
  const religionMapping = {
    개신교: 1,
    불교: 2,
    천주교: 3,
    없음: 4,
  };
  return religionMapping[religion];
}

export function formatSex(sex: string): number {
  // 성별 포맷팅 로직
  const sexMapping = {
    남자: 1,
    여자: 2,
    기타: 3,
  };
  return sexMapping[sex];
}
