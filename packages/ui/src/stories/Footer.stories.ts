import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Footer from '../components/Footer.vue';

const meta = {
  title: 'Templates/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
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
