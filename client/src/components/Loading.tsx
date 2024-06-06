import React from "react"

const Loading: React.FC = () => {
  return (
    <section className="spinner-container">
        <div className="spinner">
            <div className="inner"></div>
        </div>
    </section>
  )
}

export default Loading