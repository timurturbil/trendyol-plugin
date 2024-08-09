import { InfoCircleOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";

type FieldType = {
  token?: string;
};

export const AuthPage = observer(() => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { token } = values;
    localStorage.setItem("trendyolAuthorizationToken", token!);
        window.location.reload();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Trendyol Plugin</ScreenTitle>
      </ScreenHeader>
      <ScreenContent style={{ margin: "1.5rem" }}>
        {inputForm()}
      </ScreenContent>
    </Screen>
  );
  function inputForm() {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Trendyol Token"
          name="token"
          rules={[
            { required: true, message: "Please input your trendyol token!" },
          ]}
          tooltip={{
            title:
              "You can find your token in your Trendyol panel. Click on your name in the top right corner and then click on the Account Information tab. You will see another set of tabs, click on the Integration Information tab. And now you will see four different texts in textfields. You should get the text named Token.",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" className="rounded bg-primary px-2 py-1 text-xs text-white">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
});
