import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/Components/ui/button";

function _404() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <img
                src="/404img.svg"
                alt="404 Not Found"
                className="w-[350px] h-[350px]"
            />
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
                Sorry, the page you are looking for does not exist.
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>Go Back to Home</Button>
            
        </div>
  )
}

export default _404