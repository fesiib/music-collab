import React from 'react'
import Header from './Header'

const withHeader = (Page) => {
  return (props) => {
    return (
      <div className="w-full flex flex-col">
        <div className="w-full fixed">
          <Header />
        </div>
        <div className="mt-32">
          <Page {...props} />
        </div>
      </div>
    )
  }
}

export default withHeader;
