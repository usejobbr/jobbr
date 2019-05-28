import React from 'react'
import * as icons from '../../assets/icons'
import ReactSVG from 'react-svg'
import { kebabToCamelCase } from '../../utils/helpers'

const Icon = ({ name, style, className }) => (
  <ReactSVG
    src={icons[kebabToCamelCase(name)]}
    svgStyle={style}
    svgClassName={className}
  />
)

export default Icon
