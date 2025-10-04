import React from 'react'

export const Button = ({ className = '', active = false, reversed = false, ...props }) => (
  <span
    {...props}
    className={
      'cursor-pointer inline-flex items-center justify-center rounded px-2 py-1 text-sm border ' +
      (active
        ? 'bg-blue-600 text-white border-blue-600 '
        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 ') +
      className
    }
  />
)

export const Icon = ({ className = '', children, ...props }) => (
  <span
    {...props}
    className={'text-base leading-none ' + className}
  >
    {children}
  </span>
)

export const Toolbar = ({ className = '', ...props }) => (
  <div
    {...props}
    className={
      'flex items-center gap-1 border-b bg-gray-50 px-2 py-2 ' + className
    }
  />
)


