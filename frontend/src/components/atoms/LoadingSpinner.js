import React from 'react'

const LoadingSpinner = ({color='blue-500', styleOption}) => {
    return (
        <div class={`animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-${color} rounded-full ${styleOption}`} role="status" aria-label="loading">
            <span class="sr-only">加载中...</span>
        </div>
    )
}

export default LoadingSpinner