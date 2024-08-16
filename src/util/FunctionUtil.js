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

// 결제정보 카드번호 뒷자리 4자리만
export default function formatCardNumber(cardNumber) {
  if (cardNumber.length === 16) {
    const maskedPart = '**** **** ****';
    const lastFour = cardNumber.slice(-4);

    // 카드 번호를 4자리씩 그룹으로 나누고 공백을 넣어 형식을 만듭니다.
    const formattedLastFour = `${maskedPart} ${lastFour}`;
    
    return formattedLastFour;
  }

  // 카드번호가 16자리가 아닐 경우 처리 (예: 반환하거나 에러 처리)
  return cardNumber;
}
