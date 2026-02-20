import { AlertCircle } from 'lucide-react';
import React from 'react'

type ErrorProps = {
  errorMessage: string;
};


export default function AlertError({errorMessage}: ErrorProps) {
  return (
    <div>
      <div className="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 flex items-center gap-2">
        <AlertCircle className="text-red-600" size={20} />
        <p className="text-red-700 text-sm">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="ml-auto text-red-600 hover:text-red-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
