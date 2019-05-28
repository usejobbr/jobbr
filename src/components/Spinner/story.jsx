import React from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Spinner from './Spinner'

storiesOf('Misc', module)
  .addDecorator(withKnobs)
  .add('Spinner', () => (
    <div style={{ fontSize: text('Outer dive font-size', undefined) }}>
      <Spinner
        size={select('size', ['font-size', 'large'], Spinner.defaultProps.size)}
      />
    </div>
  ))
