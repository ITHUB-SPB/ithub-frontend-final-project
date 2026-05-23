import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ProductCard from '@/components/ProductCard.vue';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    id: 341,
    wide: false,
    currentPrice: 490,
    title: 'AirPods Max Silver'
  }
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: {
    viewport: {
      value: 'desktop'
    }
  },
};

export const Mobile: Story = {
  globals: {
    viewport: {
      value: 'mobile1'
    }
  }
};
