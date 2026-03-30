import { computed } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Icon from '../components/Icon.vue';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ["twitter", "close", "toEdit"] },
  },
  decorators: [
    (story, { args }) => {
      return {
        components: { story },
        setup() {
          const style = computed(() => ({
            backgroundColor: ['twitter'].includes(args.variant) ? 'black' : 'white',
            width: 'max-content'
          }));

          return { style };
        },
        template: '<div :style="style"><story /></div>'
      }
    }
  ],
  args: {
    variant: 'twitter',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}