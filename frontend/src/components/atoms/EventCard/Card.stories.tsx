// import Card from "./Card";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "../Button/Button";
// import theme from "../../../../src/theme";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    type: {
      control: {
        type: "select",
        options: ["purple", "purple_inset", "gray", "white"],
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
};

const styleButton = {
  padding: "14px",
  borderRadius: "12px",
  // ...theme.font14_bold,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: "submit",
    disabled: false,
    children: "Button",
  },
  render: (args) => (
    <Button {...args} css={styleButton}>
      Button
    </Button>
  ),
};
