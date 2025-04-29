import { createElement, JSX, SVGProps } from 'react'

import { SvgElementProps } from './types'

const tagMap: Record<SvgElementProps['type'], keyof JSX.IntrinsicElements> = {
  path: 'path',
  circle: 'circle',
  rect: 'rect',
  line: 'line',
  ellipse: 'ellipse',
  polygon: 'polygon',
  polyline: 'polyline',
}

/**
 * Factory function that creates a React SVG element based on the provided element definition.
 * It maps a custom element type to the corresponding intrinsic SVG element tag,
 * applies default color values for fill and stroke (with a special case for 'line' elements),
 * and returns the created React element with a unique key.
 *
 * @param element
 *    The SVG element definition including type and props.
 * @param index
 *    A unique index used as the key for the React element.
 * @param defaultColor
 *    The default color to apply if fill or stroke is not provided.
 * @returns
 *    A React JSX.Element representing the SVG element.
 */
export function createSvgElement(
  element: SvgElementProps,
  index: number,
  defaultColor?: string,
): JSX.Element {
  const Tag = tagMap[element.type]

  const { props } = element

  const newProps: SVGProps<SVGElement> =
    element.type === 'line'
      ? { ...props, stroke: props.stroke ?? defaultColor }
      : { ...props, fill: props.fill ?? defaultColor, stroke: props.stroke ?? defaultColor }

  return createElement(Tag, { key: index, ...newProps })
}
