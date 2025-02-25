import { useState } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/api';

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [manualFormActive, setManualFormActive] = useState(false);
  
  // Manual form states
  const [manualData, setManualData] = useState({
    "ANB angle": '',
    "Mandibular Plane Angle (Go-Gn to Sn)": '',
    "U1-NA": '',
    "U1-NA (mm)": '',
    "L1-NB": '',
    "L1-NB (mm)": '',
    "U1-SN": '',
    "U1-PP": '',
    "NLA (Whole Number)": '',
    "Premolar Basal Arch Width %": '',
    "Crowding in the Upper arch": '',
    "Crowding in the Lower arch": '',
    "Overbite": '',
    "Overjet": '',
    "UL-E Plane (mm) (Rickett's)": '',
    "LL-E Plane (mm) (Rickett's)": '',
    "Z Angle (Merrifield)": '',
  });
  const [actualOutcome, setActualOutcome] = useState(false); // false = non-extraction, true = extraction

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                          selectedFile.type === 'application/vnd.ms-excel')) {
      setFile(selectedFile);
    } else {
      toast.error('Please select a valid Excel file (.xlsx or .xls)');
      e.target.value = null;
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);
      
      await adminService.uploadExcelData(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadSuccess(true);
      toast.success('File uploaded successfully');
      
      // Reset file input after successful upload
      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to upload file:', error);
      toast.error(error.response?.data?.detail || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleManualFormSubmit = async (e) => {
    e.preventDefault();
    
    // Convert form data to the format expected by the API
    const inputData = {};
    for (const [key, value] of Object.entries(manualData)) {
      if (value !== '') {
        inputData[key] = parseFloat(value);
      }
    }
    
    if (Object.keys(inputData).length === 0) {
      toast.error('Please fill at least one field');
      return;
    }
    
    setUploading(true);
    
    try {
      await adminService.addManualTrainingData(inputData, actualOutcome);
      toast.success('Training data added successfully');
      
      // Reset form
      setManualData({
        "ANB angle": '',
        "Mandibular Plane Angle (Go-Gn to Sn)": '',
        "U1-NA": '',
        "U1-NA (mm)": '',
        "L1-NB": '',
        "L1-NB (mm)": '',
        "U1-SN": '',
        "U1-PP": '',
        "NLA (Whole Number)": '',
        "Premolar Basal Arch Width %": '',
        "Crowding in the Upper arch": '',
        "Crowding in the Lower arch": '',
        "Overbite": '',
        "Overjet": '',
        "UL-E Plane (mm) (Rickett's)": '',
        "LL-E Plane (mm) (Rickett's)": '',
        "Z Angle (Merrifield)": '',
      });
      setActualOutcome(false);
    } catch (error) {
      console.error('Failed to add training data:', error);
      toast.error(error.response?.data?.detail || 'Failed to add training data');
    } finally {
      setUploading(false);
    }
  };

  // Helper function to render manual input fields
  const renderManualInputFields = () => {
    const fields = [
      { name: "ANB angle", label: "ANB Angle (°)" },
      { name: "Mandibular Plane Angle (Go-Gn to Sn)", label: "Mandibular Plane Angle (°)" },
      { name: "U1-NA", label: "U1-NA (°)" },
      { name: "U1-NA (mm)", label: "U1-NA (mm)" },
      { name: "L1-NB", label: "L1-NB (°)" },
      { name: "L1-NB (mm)", label: "L1-NB (mm)" },
      { name: "U1-SN", label: "U1-SN (°)" },
      { name: "U1-PP", label: "U1-PP (°)" },
      { name: "NLA (Whole Number)", label: "Nasolabial Angle (°)" },
      { name: "Premolar Basal Arch Width %", label: "Premolar Basal Arch Width %" },
      { name: "Crowding in the Upper arch", label: "Upper Arch Crowding (mm)" },
      { name: "Crowding in the Lower arch", label: "Lower Arch Crowding (mm)" },
      { name: "Overbite", label: "Overbite (mm)" },
      { name: "Overjet", label: "Overjet (mm)" },
      { name: "UL-E Plane (mm) (Rickett's)", label: "UL-E Plane (mm)" },
      { name: "LL-E Plane (mm) (Rickett's)", label: "LL-E Plane (mm)" },
      { name: "Z Angle (Merrifield)", label: "Z Angle (°)" },
    ];
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="number"
              id={field.name}
              name={field.name}
              step="0.1"
              value={manualData[field.name]}
              onChange={handleManualInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Training Data</h1>
      
      <div className="flex flex-col space-y-8">
        {/* Method Selection */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Choose Data Entry Method</h2>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => setManualFormActive(false)}
                className={`px-4 py-2 border rounded-md ${!manualFormActive ? 'bg-blue-600 text-white border-transparent' : 'border-gray-300 text-gray-700'}`}
              >
                Excel Upload
              </button>
              <button
                onClick={() => setManualFormActive(true)}
                className={`px-4 py-2 border rounded-md ${manualFormActive ? 'bg-blue-600 text-white border-transparent' : 'border-gray-300 text-gray-700'}`}
              >
                Manual Entry
              </button>
            </div>
          </div>
        </div>

        {/* Excel Upload Form */}
        {!manualFormActive && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Excel File Upload</h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload an Excel file containing orthodontic measurements and treatment outcomes.
              </p>
              
              <form onSubmit={handleFileUpload} className="mt-5">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".xlsx,.xls"
                          disabled={uploading}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                  </div>
                </div>
                
                {file && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">Selected file: {file.name}</p>
                  </div>
                )}
                
                {uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            {uploadSuccess ? 'Complete' : 'Uploading'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {uploadProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${uploadProgress}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            uploadSuccess ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-5">
                  <button
                    type="submit"
                    disabled={!file || uploading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      (!file || uploading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Manual Data Entry Form */}
        {manualFormActive && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Manual Data Entry</h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter orthodontic measurements and treatment outcome manually.
              </p>
              
              <form onSubmit={handleManualFormSubmit} className="mt-5">
                <div className="mb-6">
                  <label className="text-base font-medium text-gray-900">Treatment Outcome</label>
                  <p className="text-sm text-gray-500">
                    Select the actual treatment outcome for this case
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="extraction-false"
                        name="extraction"
                        type="radio"
                        checked={!actualOutcome}
                        onChange={() => setActualOutcome(false)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="extraction-false" className="ml-3 block text-sm font-medium text-gray-700">
                        Non-Extraction
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="extraction-true"
                        name="extraction"
                        type="radio"
                        checked={actualOutcome}
                        onChange={() => setActualOutcome(true)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="extraction-true" className="ml-3 block text-sm font-medium text-gray-700">
                        Extraction
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Orthodontic Measurements</h3>
                  {renderManualInputFields()}
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploading ? 'Submitting...' : 'Submit Training Data'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Instructions Card */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Instructions</h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>For Excel uploads:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use Excel (.xlsx or .xls) format</li>
                <li>Include a "Final" column with "Extraction" or "Non-extraction" values</li>
                <li>The orthodontic parameters should match those used in the prediction form</li>
                <li>All measurements should be numeric values</li>
                <li>Missing values are acceptable - the system will handle them</li>
              </ul>
              
              <p className="mt-4">For manual data entry:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Select the actual treatment outcome (extraction or non-extraction)</li>
                <li>Fill in as many measurements as you have available</li>
                <li>You don't need to complete all fields - partial data is acceptable</li>
                <li>Use consistent units: degrees (°) for angles, millimeters (mm) for distances</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
