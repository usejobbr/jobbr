import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf, setAddon } from '@storybook/react'
import JSXAddon from 'storybook-addon-jsx'

import Dialog from '.'

import faker from 'faker'

setAddon(JSXAddon)

const CHILDREN = faker.lorem.paragraph()

storiesOf('Dialogs', module)
  .addDecorator(withKnobs)
  .addWithJSX('Dialog', () => (
    <Dialog
      heading={text('heading', 'Heading is Required')}
      onClose={action('onClose')}
    >
      {text('children', CHILDREN)}
    </Dialog>
  ))
