import React from 'react'

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <button className="btn-primary" {...props}>
      {children}
    </button>
  )
}

export default PrimaryButton
