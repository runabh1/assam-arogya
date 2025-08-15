
import Image from 'next/image';
import React from 'react';
import logoImage from '../../images/image6.png';

export function Logo({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <div className="relative" style={{ width: props.width, height: props.height }}>
       <Image
        src={logoImage}
        alt="Arogya Mitra Logo"
        className={className}
        width={props.width ? Number(props.width) : 24}
        height={props.height ? Number(props.height) : 24}
        {...props}
        />
    </div>
  );
}
