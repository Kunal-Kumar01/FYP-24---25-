import React from 'react'

export default function Quote() {
    return (
        <div className="hidden lg:flex flex-1 bg-gray-100 p-8 items-center justify-center">
            <div className="max-w-lg">
                <div className="p-8 rounded-xl shadow-lg text-gray-700 bg-white">
                    <p className="text-lg mb-4">
                        "Hybrid ETL/ELT has cut months of employee hours off of our pipeline development and delivered usable data to us in hours instead of weeks."
                    </p>
                    <p className="font-medium text-gray-600">- Director of Technology at Cart.com</p>
                </div>
            </div>
        </div>
    )
}
