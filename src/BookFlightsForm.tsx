import { Button, DatePicker, Form, Input, Radio } from "antd";
import { useState } from "react";

export const BookFlightsForm = () => {
  const [type, setType] = useState("SINGLE");
  const [form] = Form.useForm();
  return (
    <div style={{ padding: "50px", border: "10px solid black" }}>
      <Form
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
        }}
        form={form}
      >
        <Form.Item name={"type"} label={"Type of Flight"}>
          <Radio.Group
            options={[
              { label: "One-Way Flight", value: "SINGLE" },
              { label: "Return Flight", value: "RETURN" },
            ]}
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></Radio.Group>
        </Form.Item>
        <h1>You are booking for {type} flight</h1>
        <Form.Item name={"departure"} label={"Departure"}>
          <DatePicker />
        </Form.Item>
        {type === "RETURN" && (
          <Form.Item name={"return"} label={"Return"}>
            <DatePicker />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit" disabled={false}>
          Book
        </Button>
      </Form>
    </div>
  );
};
