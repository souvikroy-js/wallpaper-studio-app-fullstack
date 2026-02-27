export const delayTime = async (ms: number) => {
	await new Promise((r) => setTimeout(r, ms));
};

export default delayTime;
