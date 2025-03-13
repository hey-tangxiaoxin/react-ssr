import React, { useCallback, useState } from "react";
import { Input, Button } from "antd";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import styles from "./index.less";
const Chat = () => {
  const [value, setValue] = useState<string>("");
  const [stream, setStream] = useState<string>();
  const onClick = useCallback(() => {
    fetchEventSource("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ role: "user", content: value }]),
      onmessage(event: EventSourceMessage) {
        if (event.data !== "[DONE]") {
          setStream(event.data);
        } else {
          console.log("回答完了");
        }
      },
    });
  }, [value]);
  return (
    <div className={styles.chat}>
      <Input.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="primary" onClick={onClick}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
