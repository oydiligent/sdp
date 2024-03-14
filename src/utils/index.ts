// 导出
export const exportExcel = (
	url: string,
	name = "数据",
	format = "xls",
): void => {
	const aLink = document.createElement("a");
	const blob = new Blob([url], { type: "application/vnd.ms-excel" });
	// 创建一个当前文件的内存URL
	const href = URL.createObjectURL(blob);
	aLink.style.display = "none";
	aLink.href = href;
	document.body.appendChild(aLink);
	aLink.setAttribute("download", `${name}.${format}`);
	aLink.click();
	document.body.removeChild(aLink);
	// 手动释放创建的URL对象所占内存
	URL.revokeObjectURL(href);
};

// 导入
export const importExcel = async (): Promise<FormData> => {
	return await new Promise((resolve) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".xls,.xlsx";
		input.multiple = false;
		input.click();
		input.addEventListener("change", () => {
			const file =
				input.files !== null && input.files?.length > 0 ? input.files[0] : "";
			const formData = new FormData();
			formData.append("file", file);
			resolve(formData);
			input.remove();
		});
	});
};
