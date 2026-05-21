import type { Meta, StoryObj } from '@storybook/vue3-vite';

import DetailCard from '@/components/DetailCard.vue';

const meta = {
    title: 'Molecules/DetailCard',
  component: DetailCard,
  tags: ['autodocs'],
  args: {
    variant: 'cpuCores',
    value: '4'
  },
  argTypes: {
    variant: { control: 'select', options: ["screenSize", "cpu", "cpuCores", "mainCamera", "frontCamera", "battery"] },
    value: { control: 'text' }
  }
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};