import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import Header from '../components/Header.vue';

const meta = {
  title: 'Templates/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

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
