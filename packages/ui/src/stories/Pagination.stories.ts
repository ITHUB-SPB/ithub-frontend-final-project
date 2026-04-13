import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { ref } from 'vue';

import Pagination from '@/components/Pagination.vue';

const activePage = ref<number>(1)

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    pageQuantity: { control: 'number' },
    activePage: { control: 'number' },
    updateActivePage: fn()
  },
  args: {
    pageQuantity: 7,
    activePage,
    updateActivePage: (pageNumber: number) => {
      activePage.value = pageNumber
    }
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};