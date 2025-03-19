import { memo, type SVGProps } from 'react'

export type SvgElementProps =
  | { type: 'path'; props: SVGProps<SVGPathElement> }
  | { type: 'circle'; props: SVGProps<SVGCircleElement> }
  | { type: 'rect'; props: SVGProps<SVGRectElement> }
  | { type: 'line'; props: SVGProps<SVGLineElement> }
  | { type: 'ellipse'; props: SVGProps<SVGEllipseElement> }
  | { type: 'polygon'; props: SVGProps<SVGPolygonElement> }
  | { type: 'polyline'; props: SVGProps<SVGPolylineElement> }

export interface IconProps extends SVGProps<SVGSVGElement> {
  elements: SvgElementProps[]
  size?: string | number
  color?: string
  className?: string
  viewBox?: string
  ariaHidden?: boolean
  ariaLabel?: string
  title?: string
}

const Icon = memo(
  ({
    elements,
    size = '20px',
    color,
    className,
    title,
    viewBox = '0 0 24 24',
    ariaHidden = true,
    ...rest
  }: IconProps) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-hidden={ariaHidden}
        role='img'
        {...rest}
      >
        {title && <title>{title}</title>}
        {elements.map((element, index) => {
          switch (element.type) {
            case 'path':
              return (
                <path
                  key={index}
                  {...element.props}
                  fill={element.props.fill || color}
                  stroke={element.props.stroke || color}
                />
              )
            case 'circle':
              return (
                <circle
                  key={index}
                  {...element.props}
                  fill={element.props.fill || color}
                  stroke={element.props.stroke || color}
                />
              )
            case 'rect':
              return (
                <rect
                  key={index}
                  {...element.props}
                  fill={element.props.fill || color}
                  stroke={element.props.stroke || color}
                />
              )
            case 'line':
              return <line key={index} {...element.props} stroke={element.props.stroke || color} />
            case 'ellipse':
              return (
                <ellipse
                  key={index}
                  {...element.props}
                  fill={element.props.fill || color}
                  stroke={element.props.stroke || color}
                />
              )
            case 'polygon':
              return (
                <polygon
                  key={index}
                  {...element.props}
                  fill={element.props.fill || color}
                  stroke={element.props.stroke || color}
                />
              )
            case 'polyline':
              return (
                <polyline
                  key={index}
                  {...element.props}
                  fill={element.props.fill || color}
                  stroke={element.props.stroke || color}
                />
              )
            default:
              return null
          }
        })}
      </svg>
    )
  },
)

export default Icon
