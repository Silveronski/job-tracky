import React from "react"
import loadingGif from "../../assets/images/loadinggif.gif";

interface LoadingProps { className?: string }
  
const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
  return (
    <section className={className}>
      <img className="loading-indicator" src={loadingGif} alt="loading-gif"/>
    </section>
  )
}

export default Loading