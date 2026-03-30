import { computed } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';

import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Molecules/ButtonWithIcon',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['fill', 'stroke'] },
    color: { control: 'select', options: ['white', 'black'] },
    small: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: "Label",
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhiteStrokeWithIcon: Story = {
  args: {
    variant: "stroke",
    color: "black"
  },
  decorators: [
    (story, { args }) => {
      return {
        components: { story },
        template: `
          <Button :props="args"> 
            <Icon variant="twitter" />
          </Button>
        `
      }
    }
  ],
};

// export const Fill: Story = {
//   args: {
//     variant: "fill",
//     color: "white"
//   }
// };

// export const BlackStroke: Story = {
//   args: {
//     variant: 'stroke',
//     color: 'black',
//   },
// };

// export const WhiteStrokeSmall: Story = {
//   args: {
//     ...WhiteStroke.args,
//     small: true
//   }
// }

// export const FillSmall: Story = {
//   args: {
//     small: true
//   }
// };

// export const BlackStrokeSmall: Story = {
//   args: {
//     ...BlackStroke.args,
//     small: true
//   }
// }