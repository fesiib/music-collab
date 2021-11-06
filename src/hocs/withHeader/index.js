import React from 'react'
import Header from './Header'

const withHeader = (Page) => {
  return (props) => {
    return (
      <div className="w-full flex flex-col">
        <Header />
        <Page {...props} />
      </div>
    )
  }
}

export default withHeader
