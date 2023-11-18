import { PushAPI } from "@pushprotocol/restapi";

export const Push = async (signer, receiver_address, text) => {
    try {
        console.log(signer);

        const userAlice = await PushAPI.initialize(signer, { env: "prod" });

        console.log(userAlice);
        const aliceMessagesBob = await userAlice.chat.send(receiver_address, {
            type: "Text",
            content: text,
        });
        console.log(aliceMessagesBob);
    } catch (e) {
        console.log(e);
    }
};
