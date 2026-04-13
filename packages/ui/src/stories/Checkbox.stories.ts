import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';

import Checkbox from '@/components/Checkbox.vue';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: "Label",
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSlot: Story = {
  decorators: [
    (story) => ({
      components: { story, Checkbox },
      template: `
        <Checkbox label="Apple">
            <span>120</span>
        </Checkbox>
      `
    })
  ]
};
