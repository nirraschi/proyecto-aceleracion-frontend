import { Icon } from '@iconify/react';
import { IconifyProps } from './types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconifyProps;
  width?: number | string;
  className?: string;
}

function Iconify({ icon, width = 20, className = '', style, ...other }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center component-iconify ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof width === 'number' ? `${width}px` : width,
        ...style
      }}
      {...other}
    >
      <Icon icon={icon} width="100%" height="100%" />
    </div>
  )
}

export default Iconify;
