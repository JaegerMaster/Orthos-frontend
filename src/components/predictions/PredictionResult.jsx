import React from 'react';

const PredictionResult = ({ result }) => {
  const {
    extraction_required,
    confidence,
    explanation,
    raw_prediction
  } = result;

  // Helper function to determine confidence level label and color
  const getConfidenceDetails = (confidenceValue) => {
    if (confidenceValue >= 90) {
      return { label: 'Very High', bgColor: 'bg-green-100', textColor: 'text-green-800' };
    } else if (confidenceValue >= 75) {
      return { label: 'High', bgColor: 'bg-green-100', textColor: 'text-green-800' };
    } else if (confidenceValue >= 60) {
      return { label: 'Moderate', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    } else {
      return { label: 'Low', bgColor: 'bg-red-100', textColor: 'text-red-800' };
    }
  };

  const confidenceDetails = getConfidenceDetails(confidence);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Treatment Recommendation
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Based on the provided measurements, the AI recommends:
        </p>
      </div>
      
      <div className="border-t border-gray-200">
        <div className="px-4 py-4 sm:px-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold">
              {extraction_required ? 'Extraction' : 'Non-Extraction'}
            </h4>
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${confidenceDetails.bgColor} ${confidenceDetails.textColor}`}>
              {confidenceDetails.label} confidence ({confidence.toFixed(1)}%)
            </span>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Explanation</h4>
          <div className="bg-gray-50 p-4 rounded-md">
            <ul className="space-y-2">
              {explanation.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Confidence visualization */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 mb-2">Confidence Level</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${extraction_required ? 'bg-blue-600' : 'bg-indigo-600'}`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Technical details (optional, can be hidden or shown with a toggle) */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                <span>Technical Details</span>
                <svg className="ml-2 h-5 w-5 text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="mt-2 text-sm text-gray-500">
                <p>Raw prediction value: {raw_prediction.toFixed(4)}</p>
                <p>Decision threshold: 0.5</p>
                <p>Prediction made at: {new Date().toLocaleString()}</p>
              </div>
            </details>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 italic">
              Disclaimer: This AI recommendation is intended to assist orthodontists in their clinical decision-making process. It should be used in conjunction with professional judgment and patient-specific considerations. The final treatment decision remains the responsibility of the treating clinician.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
