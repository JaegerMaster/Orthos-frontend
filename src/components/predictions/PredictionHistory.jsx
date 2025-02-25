import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { predictionService } from '../../services/api';
import { toast } from 'react-toastify';

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch prediction history on component mount
  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await predictionService.getPredictionHistory();
      setPredictions(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch predictions:', err);
      setError('Failed to load prediction history. Please try again later.');
      toast.error('Failed to load prediction history');
    } finally {
      setLoading(false);
    }
  };

  const viewPredictionDetails = (prediction) => {
    setSelectedPrediction(prediction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrediction(null);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={fetchPredictions}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Prediction History</h1>
        <Link
          to="/dashboard/predict"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          New Prediction
        </Link>
      </div>

      {predictions.length === 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No predictions yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by making a new prediction.</p>
            <div className="mt-6">
              <Link
                to="/dashboard/predict"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Make Prediction
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {predictions.map((prediction) => {
              const confidenceDetails = getConfidenceDetails(prediction.confidence);
              return (
                <li key={prediction.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {prediction.extraction_required ? 'Extraction' : 'Non-Extraction'}
                      </p>
                      <div className="mt-2 sm:mt-0 sm:ml-6 flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${confidenceDetails.bgColor} ${confidenceDetails.textColor}`}>
                          {confidenceDetails.label} confidence ({prediction.confidence.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button
                        onClick={() => viewPredictionDetails(prediction)}
                        className="ml-2 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <span>Created: {formatDate(prediction.created_at)}</span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Prediction Details Modal */}
      {showModal && selectedPrediction && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Prediction Details
                    </h3>
                    
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-500">Result:</p>
                        <span className="text-sm font-bold text-gray-900">
                          {selectedPrediction.extraction_required ? 'Extraction' : 'Non-Extraction'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-500">Confidence:</p>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedPrediction.confidence.toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-500">Created:</p>
                        <span className="text-sm text-gray-900">
                          {formatDate(selectedPrediction.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Explanation:</p>
                      <div className="mt-2 bg-gray-50 p-3 rounded-md">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {selectedPrediction.explanation.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Input Parameters:</p>
                      <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                        <div className="max-h-40 overflow-y-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Parameter
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedPrediction.input_data && 
                               Object.entries(selectedPrediction.input_data)
                                .filter(([_, value]) => value !== null && value !== undefined)
                                .map(([key, value]) => (
                                  <tr key={key}>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                                      {key}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                      {typeof value === 'number' ? value.toFixed(2) : value}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;
