export const getSnaps = async () => {
    return await window.ethereum.request({
        method: "wallet_getSnaps",
    });
};
export const connectSnap = async () => {
    await window.ethereum.request({
        method: "wallet_requestSnaps",
        params: {
            ["local:http://localhost:8080"]: {},
        },
    });
};

export const getSnap = async () => {
    try {
        const snaps = await getSnaps();

        return Object.values(snaps).find((snap) => snap.id === "local:http://localhost:8080");
    } catch (error) {
        console.log("Failed to obtain installed snap", error);
        return;
    }
};
