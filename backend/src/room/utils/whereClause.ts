export function stringArrayWhereClause(column: string, values: string[]) {
  const whereConditions = values.map((value, index) => {
    return `(room.${column} LIKE :value${index})`;
  });

  const whereClause = whereConditions.join(' OR ');

  const queryParams = {};
  values.forEach((value, index) => {
    queryParams[`value${index}`] = `%${value}%`;
  });

  return [whereClause, queryParams];
}

export function roomSizeWhereClause(roomSizeTypes: string[]) {
  const sizeConditions = roomSizeTypes.map((sizeType, index) => {
    switch (sizeType) {
      case '소형':
        return '(room.roomSize BETWEEN :smallRoomSize AND :mediumRoomSize)';
      case '중형':
        return '(room.roomSize BETWEEN :mediumRoomSize AND :largeRoomSize)';
      case '대형':
        return '(room.roomSize BETWEEN :largeRoomSize AND :extraLargeRoomSize)';
      case '대형+':
        return '(room.roomSize >= :extraLargeRoomSize)';
      default:
        return null;
    }
  });

  const combinedSizeConditions = sizeConditions
    .filter((condition) => condition !== null)
    .join(' OR ');

  console.log(combinedSizeConditions);

  return combinedSizeConditions;
}
