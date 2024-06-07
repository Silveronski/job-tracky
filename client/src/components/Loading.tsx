import React from "react"
import loadingGif from "../assets/images/loadinggif.gif";

interface LoadingProps { className?: string }
  
const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <img className="loading-indicator" src={loadingGif} alt="loading-gif"/>
    </div>
  )
}

export default Loading