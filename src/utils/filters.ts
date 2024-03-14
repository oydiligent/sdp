export function phoneFormat(value: string, defaultStr = ""): string {
	if (value === "") return defaultStr;
	return value.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
}
