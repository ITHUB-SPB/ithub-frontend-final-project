import type { Meta, StoryObj } from '@storybook/vue3-vite';

import CartPrice from '@/components/CartPrice.vue';

const meta = {
  title: 'Organisms/CartPrice',
  component: CartPrice,
  tags: ['autodocs'],
  args: {
    quantity: 1,
    price: 1399,
  }
} satisfies Meta<typeof CartPrice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    quantity: 4
  },

  globals: {
    viewport: { 
      value: 'desktop'
    }
  }
};

export const Mobile: Story = {
  globals: {
    viewport: { 
      value: 'mobile1'
    }
  }  
};