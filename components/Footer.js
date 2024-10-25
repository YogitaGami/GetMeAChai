import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='flex justify-center flex-col sm:flex-row items-center bg-[#00091d] text-white p-4 h-16'>
      <p>Copyright &copy; {currentYear}</p>
      <p> Get Me A Chai - All rights reserved</p>
    </footer>
  )
}

export default Footer
