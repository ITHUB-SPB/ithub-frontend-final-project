import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';

import Button from '@/components/Button.vue';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['fill', 'stroke'] },
    color: { control: 'select', options: ['white', 'black'] },
    small: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'select', options: ["twitter", "close", "toEdit"] }
  },
  args: {
    label: "Label",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhiteStroke: Story = {
  args: {
    variant: "stroke",
    color: "black"
  },
};

export const Fill: Story = {
  args: {
    variant: "fill",
    color: "white"
  }
};

export const BlackStroke: Story = {
  args: {
    variant: 'stroke',
    color: 'black',
  },
};

export const WhiteStrokeSmall: Story = {
  args: {
    ...WhiteStroke.args,
    small: true
  }
}

export const FillSmall: Story = {
  args: {
    small: true
  }
};

export const BlackStrokeSmall: Story = {
  args: {
    ...BlackStroke.args,
    small: true
  }
}

export const WithIcon: Story = {
  args: {
    ...BlackStrokeSmall.args,
    icon: "close"
  }
}