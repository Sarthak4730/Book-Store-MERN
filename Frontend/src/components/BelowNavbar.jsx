const BelowNavbar = () => {
  return (
    <div className='w-[80vw] h-[50vh] mx-auto mt-10 flex'>
      <div className="left w-[40vw] flex flex-col justify-center">
        <h1 className='text-3xl'>New Releases This Week</h1>
        <p className='w-[25vw] my-7 text-gray-700'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
        
      </div>

      <div className="right w-[40vw] flex justify-center items-center relative">
        <img className="h-[40vh] z-3" src="belowNavbarThreeBooks/first.png" alt="first" />
        <img className="h-[35vh] z-2 absolute left-[21vw]" src="belowNavbarThreeBooks/second.png" alt="second" />
        <img className="h-[30vh] z-1 absolute left-[27vw]" src="belowNavbarThreeBooks/third.png" alt="third" />
      </div>
    </div>
  )
}

export default BelowNavbar