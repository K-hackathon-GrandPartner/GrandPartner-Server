export function formatCycleType(cycleType: number) {
  // 체크리스트 주기 포맷팅
  const cycleTypeMapping = {
    1: 'month',
    2: 'week',
    3: 'day',
    4: 'etc',
  };
  return cycleTypeMapping[cycleType];
}
