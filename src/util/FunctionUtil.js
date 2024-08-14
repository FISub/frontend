// 긴 상품명 ... 처리
export function truncateName(name, maxLength = 10) {
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + "...";
  }
  return name;
}

// 카테고리 이름
export function categoryName(categoryNum) {
  switch (categoryNum) {
    case 0:
      return "기타";
    case 1:
      return "비타민/미네랄";
    case 2:
      return "영양제";
    case 3:
      return "헬스/다이어트 식품";
	default:
		return "기타";
  }
}
