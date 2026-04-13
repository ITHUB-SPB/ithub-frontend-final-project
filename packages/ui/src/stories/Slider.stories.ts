import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Slider from '@/components/Slider.vue';


const meta = {
  title: 'Organisms/Slider',
  component: Slider,
  argTypes: {
    min: { control: "number" },
    max: { control: "number" }
  },
  args: {
    min: 0,
    max: 1000
  }
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 10
  }
};