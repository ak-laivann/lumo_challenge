import { Button, DatePicker, Form, Radio } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const BookFlightsForm = () => {
  const [type, setType] = useState("SINGLE");
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  const departureDate = Form.useWatch("departure", form);

  // check fields to disable the submit button
  const checkFields = (values: any) => {
    const { departure, return: returnDate } = values;
    const isValid =
      type === "SINGLE" ? !!departure : !!departure && !!returnDate;
    setIsDisabled(!isValid);
  };

  // this function would be run on submitting
  const handleFinish = (values: any) => {
    const departureDate = values.departure.format("YYYY-MM-DD");
    if (type === "SINGLE") {
      toast.success(`You have booked the ticket for ${departureDate}`);
    } else {
      const returnDate = values.return.format("YYYY-MM-DD");
      toast.success(
        `You have booked the ticket for ${departureDate} and ${returnDate}`
      );
    }

    // after the backend call or in this case toast, we need to reset the fields and simulate the default behavior
    form.resetFields();
    setType("SINGLE");
    setIsDisabled(true);
  };

  // this disables past dates
  const disablePastDates = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  // this is for return date picker
  const disableReturnDates = (current: any) => {
    if (!departureDate) return disablePastDates(current);
    return (
      current < dayjs().startOf("day") ||
      current < dayjs(departureDate).startOf("day")
    );
  };

  return (
    <div style={{ padding: "50px", border: "10px solid black" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        onValuesChange={(_, allValues) => checkFields(allValues)}
      >
        <Form.Item name={"type"} label={"Type of Flight"}>
          <Radio.Group
            defaultValue={type}
            options={[
              { label: "One-Way Flight", value: "SINGLE" },
              { label: "Return Flight", value: "RETURN" },
            ]}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              if (e.target.value === "SINGLE") {
                form.setFieldsValue({ return: undefined });
              }
            }}
          />
        </Form.Item>

        <h1>You are booking for {type} flight</h1>

        <Form.Item
          name={"departure"}
          label={"Departure"}
          rules={[
            { required: true, message: "Please select a departure date" },
          ]}
        >
          <DatePicker disabledDate={disablePastDates} />
        </Form.Item>

        {type === "RETURN" && (
          <Form.Item
            name={"return"}
            label={"Return"}
            rules={[{ required: true, message: "Please select a return date" }]}
          >
            <DatePicker disabledDate={disableReturnDates} />
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit" disabled={isDisabled}>
          Book
        </Button>
      </Form>
    </div>
  );
};
