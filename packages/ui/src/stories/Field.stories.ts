import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';

import Field from '@/components/Field.vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';

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
    name: { table: { disable: true } },
    label: { control: 'text' }
  },
  args: {
    required: false,
    type: "text",
    placeholder: "",
    label: undefined
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    "icon-left": { table: { disable: true } },
    "right": { table: { disable: true } }
  }
};

export const WithLabel: Story = {
  args: {
    label: "Your bonus card number"
  }
};

export const WithIcon: Story = {
  argTypes: {
    "icon-left": { control: "boolean" },
    "right": { control: "boolean" },
  },
  args: {
    "icon-left": true,
    "right": false,
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
            <template v-if="args['right']" #right>
              <Icon variant="close" />
            </template>
        </Field>
      `
    })
  ]
};

export const WithButton: Story = {
  argTypes: {
    "icon-left": { control: "boolean" },
    "right": { control: "boolean" },
  },
  args: {
    "icon-left": false,
    "right": true,
  },
  decorators: [
    (story, { args }) => ({
      components: { story, Field, Icon, Button },
      setup() {
        return { args }
      },
      template: `
        <Field>
            <template v-if="args['icon-left']" #icon-left>
              <Icon variant="toEdit" />
            </template>
            <template v-if="args['right']" #right>
              <Button label="Apply" variant="stroke" color="black" small />
            </template>
        </Field>
      `
    })
  ]
};
