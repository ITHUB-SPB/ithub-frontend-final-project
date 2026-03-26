import { computed } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Logo from '../components/Logo.vue';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['black', 'white'] },
  },
  decorators: [
    (story, { args }) => {
      return {
        components: { story },
        setup() {          
          const style = computed(() => ({
            backgroundColor: args.color === 'black' ? 'white' : 'black',
            width: 'max-content'
          }));
 
          return { style };
        },
        template: '<div :style="style"><story /></div>'
      }
    }
  ],
  args: {
    color: 'black',
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Black: Story = {
  args: {
    color: 'black'
  },
};

export const White: Story = {
  args: {
    color: 'white'
  },
};
