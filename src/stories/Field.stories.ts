import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';

import Field from '@/components/Field.vue';
import Icon from '@/components/Icon.vue';

const meta = {
  title: 'Molecules/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: "text" },
    type: { 
      control: 'inline-radio', 
      options: ["text", "password", "search", "email"] 
    },
    required: { control: "boolean" },
    name: { table: { disable: true } }
  },
  args: {
    required: false,
    type: "text",
    placeholder: ""
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    "icon-left": { table: { disable: true }},
    "icon-right": { table: { disable: true }}
  }
};

export const WithIcon: Story = {
  argTypes: {
    "icon-left": { control: "boolean" },
    "icon-right": { control: "boolean" },
  },
  args: {
    "icon-left": true,
    "icon-right": false,
  },
  decorators: [
    (story, { args }) => ({
      components: { story, Field, Icon },
      setup() {
        return { args }
      },
      template: `
        <Field>
            <template v-if="args['icon-left']" #icon-left>
              <Icon variant="toEdit" />
            </template>
            <template v-if="args['icon-right']" #icon-right>
              <Icon variant="close" />
            </template>
        </Field>
      `
    })
  ]
};
