export function formatLoginType(loginType: string) {
  // 건물 유형 포맷팅 로직
  const loginTypeMapping = {
    kakao: 1,
    phone: 2,
  };
  return loginTypeMapping[loginType];
}
