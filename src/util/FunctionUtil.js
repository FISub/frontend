// 긴 상품명 ... 처리
export function truncateName(name, maxLength = 10) {
	if (name.length > maxLength) {
		return name.slice(0, maxLength) + "...";
	}
	return name;
}