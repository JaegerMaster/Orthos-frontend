import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/api';

const ModelManagement = () => {
  const [modelVersions, setModelVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [modelDescription, setModelDescription] = useState('');

  useEffect(() => {
    fetchModelVersions();
  }, []);

  const fetchModelVersions = async () => {
    setLoading(true);
    try {
      const response = await adminService.getModelVersions();
      setModelVersions(response.data);
    } catch (error) {
      console.error('Failed to fetch model versions:', error);
      toast.error('Failed to load model versions');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateModel = async (versionId) => {
    try {
      await adminService.activateModelVersion(versionId);
      toast.success('Model activated successfully');
      fetchModelVersions();
    } catch (error) {
      console.error('Failed to activate model:', error);
      toast.error(error.response?.data?.detail || 'Failed to activate model');
    }
  };

  const handleTrainModel = async (e) => {
    e.preventDefault();
    
    if (!modelDescription.trim()) {
      toast.error('Please provide a description for the model');
      return;
    }
    
    setTrainingInProgress(true);
    try {
      await adminService.trainNewModel(modelDescription);
      toast.success('Model training started. This may take a few minutes.');
      setShowTrainModal(false);
      setModelDescription('');
      
      // Fetch updated model versions after a delay to allow training to start
      setTimeout(fetchModelVersions, 2000);
    } catch (error) {
      console.error('Failed to start model training:', error);
      toast.error(error.response?.data?.detail || 'Failed to start model training');
    } finally {
      setTrainingInProgress(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Model Management</h1>
        <button
          onClick={() => setShowTrainModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Train New Model
        </button>
      </div>

      {modelVersions.length === 0 ? (
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
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No model versions found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by training your first model.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowTrainModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Train New Model
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Version
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Accuracy
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {modelVersions.map((version) => (
                        <tr key={version.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{version.version}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{version.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {version.accuracy ? (version.accuracy * 100).toFixed(2) + '%' : 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(version.created_at)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              version.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {version.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {!version.is_active && (
                              <button
                                onClick={() => handleActivateModel(version.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Activate
                              </button>
                            )}
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
      )}

      {/* Train Model Modal */}
      {showTrainModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowTrainModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleTrainModel}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Train New Model
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Training a new model will use all verified training data. The process may take several minutes depending on the amount of data.
                        </p>
                        <div className="mt-4">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Model Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            value={modelDescription}
                            onChange={(e) => setModelDescription(e.target.value)}
                            required
                            placeholder="e.g., Model with 50 new cases"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={trainingInProgress}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                      trainingInProgress ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {trainingInProgress ? 'Starting Training...' : 'Start Training'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowTrainModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Card */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">About Model Training</h2>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Training a new model improves prediction accuracy by learning from verified training data. Here are some tips:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Ensure you have sufficient verified training data before training a new model (at least 20-30 cases)</li>
              <li>More diverse data leads to better model performance</li>
              <li>Training takes several minutes, so be patient</li>
              <li>The accuracy metric shows how well the model predicts on test data</li>
              <li>Only one model can be active at a time - activate the one with the best accuracy</li>
            </ul>
            
            <p className="mt-4">Model version naming convention:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Models are named automatically with a timestamp</li>
              <li>The description field helps you track the purpose or dataset used</li>
              <li>Active models are used for all predictions across the system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelManagement;
