import reconnectingWebsocket from "./_lib/reconnecting-websocket";
import ReconnectingWebsocket from "./_lib/reconnecting-websocket";
export default class StreamCompanionWebSocket {
    url = "ws://localhost:20727/tokens";
    tokens = [];
    invoke_message = (data) => {

    };
    #websocket;

    constructor(url, tokens) {
        if (url != null)
            this.url = url;
        if (tokens != null)
            this.tokens = tokens;
    }

    setTokens(tokens) {
        this.tokens = tokens;
    }
    addTokens(tokens) {
        this.tokens = this.tokens.concat(tokens.filter((item) => this.tokens.indexOf(item) < 0))
        websocket.send(JSON.stringify(tokens));
    }

    createConnection() {
        if (this.tokens == null || this.tokens.length == 0)
            throw Error("Token value is not valid.");
        this.websocket = new ReconnectingWebsocket(this.url, null, {
            automaticOpen: false,
            reconnectInerval: 3000
        });
        this.websocket.onopen = () => {
            console.log(`[SC-WEBSOCKET] Connected to ${this.url}.`);
            this.websocket.send(JSON.stringify(this.tokens))
        };
        this.websocket.onmessage = (evt) => {
            this.invoke_message(evt.data);
        };
        this.websocket.open();

    }
}
