import React from 'react'
import Image from 'next/image'

const LogoHeader = () => {
  return (
    <div className="flex justify-center items-center w-full py-4">
      <Image 
        src="/image/logo/logo_horizontal.png"
        alt="Logo Horizontal"
        width={200}
        height={100}
        priority
      />
    </div>
  )
}

export default LogoHeader