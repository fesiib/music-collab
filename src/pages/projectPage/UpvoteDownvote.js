import React from 'react'

import upvoteIcon from '../../icons/upvote.svg'

const UpvoteDownvote = ({ initialUpvotes, size }) => {
  const [upvoteStatus, setUpvoteStatus] = React.useState('neutral') // neutral, upvoted, downvoted

  const getSize = (size) => {
    switch (size) {
      case 'small':
        return {
          div: 'h-10',
          text: 'text-2xl'
        }
      case 'large':
        return {
          div: 'h-16',
          text: 'text-4xl'
        }
      default:
        return {
          div: 'h-12',
          text: 'text-lg'
        }
    }
  }

  const handleUpvote = () => {
    if (upvoteStatus === 'upvoted') {
      setUpvoteStatus('neutral')
      return
    }
    setUpvoteStatus('upvoted')
  }

  const handleDownvote = () => {
    if (upvoteStatus === 'downvoted') {
      setUpvoteStatus('neutral')
      return
    }
    setUpvoteStatus('downvoted')
  }

  const getUpvoteNumberAndColor = () => {
    if (upvoteStatus === 'upvoted') {
      return {
        count: initialUpvotes + 1,
        color: 'text-yellow-600'
      }
    }
    if (upvoteStatus === 'downvoted') {
      return {
        count: initialUpvotes - 1,
        color: 'text-blue-400'
      }
    }
    return {
      count: initialUpvotes,
      color: 'text-black'
    }
  }

  const elemSize = getSize(size)
  const upvoteNumberAndColor = getUpvoteNumberAndColor()

  return (
    <div className={`flex flex-row w-max  items-center ${elemSize.div}`}>
      <div className={`${elemSize.text} ${upvoteNumberAndColor.color}`}>
        {upvoteNumberAndColor.count}
      </div>
      <img
        className="h-3/4 cursor-pointer"
        src={upvoteIcon}
        alt="upvote"
        onClick={handleUpvote}
      />
      <img
        className="h-3/4 self-end cursor-pointer transform rotate-180"
        src={upvoteIcon}
        alt="upvote"
        onClick={handleDownvote}
      />
    </div>
  )
}

export default UpvoteDownvote
