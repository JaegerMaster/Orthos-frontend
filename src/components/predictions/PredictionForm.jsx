import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { predictionService } from '../../services/api';
import PredictionResult from './PredictionResult';

const PredictionForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('photographic');

  // Define tabs for the form
  const tabs = [
    { id: 'photographic', name: 'Photographic Analysis' },
    { id: 'modelCareys', name: 'Model Analysis (Carey\'s)' },
    { id: 'modelArchPerimeter', name: 'Model Analysis (Arch Perimeter)' },
    { id: 'modelAshley', name: 'Model Analysis (Ashley Howe\'s)' },
    { id: 'modelOthers', name: 'Model Analysis (Others)' },
    { id: 'hardTissue', name: 'Hard Tissue Cephalometrics' },
    { id: 'softTissue', name: 'Soft Tissue Cephalometrics' },
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    // We'll use a more lenient validation since not all fields are required
    // and will rely on the backend for more specific validation
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      // Photographic Analysis
      "NLA (Whole Number)": '',
      
      // Model Analysis (Carey's)
      "Total Tooth Material (Carey's Analysis) (Whole Number)": '',
      "Arch Length (Carey's Analysis) (Whole Number)": '',
      
      // Model Analysis (Arch Perimeter)
      "Total Tooth Material (Arch Perimeter Analysis)": '',
      "Arch Length (Arch Perimeter Analysis) (Whole Number)": '',
      
      // Model Analysis (Ashley Howe's)
      "Total Tooth Material (Ashley Howe's)": '',
      "Premolar Diameter (Ashley Howe's)": '',
      "Basal Arch Width (Ashley Howe's)": '',
      "Premolar Basal Arch Width %": '',
      
      // Model Analysis (Others)
      "Crowding in the Upper arch": '',
      "Crowding in the Lower arch": '',
      "Overbite": '',
      "Overjet": '',
      "Curve of Spee": '',
      
      // Hard Tissue Cephalometrics
      "ANB angle": '',
      "Mandibular Plane Angle (Go-Gn to Sn)": '',
      "U1-NA": '',
      "U1-NA (mm)": '',
      "L1-NB": '',
      "L1-NB (mm)": '',
      "U1-SN": '',
      "U1-PP": '',
      
      // Soft Tissue Cephalometrics
      "Facial Angle (G-Sn-Pos) (Down)": '',
      "UL-E Plane (mm) (Rickett's)": '',
      "LL-E Plane (mm) (Rickett's)": '',
      "Z Angle (Merrifield)": '',
      "Lip Strain (Holdway)": '',
      "Interlabial Gap (Stms-Stmi) (Arnett & Bergnett)": '',
      "S-Line Upper Lip (Steiner's)": '',
      "S-Line Lower Lip (Steiner's)": '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Clean the input data - convert empty strings to null and strings to numbers
        const cleanedValues = {};
        for (const [key, value] of Object.entries(values)) {
          if (value === '') {
            // Skip empty fields or replace with null if backend expects it
            continue;
          } else {
            // Convert to number
            cleanedValues[key] = parseFloat(value);
          }
        }

        // Make prediction request
        const response = await predictionService.makePrediction(cleanedValues);
        setResult(response.data);
        toast.success('Prediction completed successfully');
      } catch (error) {
        console.error('Prediction error:', error);
        toast.error(error.response?.data?.detail || 'Failed to make prediction');
      } finally {
        setLoading(false);
      }
    },
  });

  // Reset form and results
  const handleReset = () => {
    formik.resetForm();
    setResult(null);
  };

  // Helper function to render input fields based on the active tab
  const renderFields = () => {
    switch (activeTab) {
      case 'photographic':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="nla" className="block text-sm font-medium text-gray-700">
                Nasolabial Angle (NLA) (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 102° ± 4</p>
              <input
                type="number"
                id="nla"
                name="NLA (Whole Number)"
                step="0.1"
                value={formik.values["NLA (Whole Number)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      case 'modelCareys':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="careysTTM" className="block text-sm font-medium text-gray-700">
                Total Tooth Material (mm)
              </label>
              <input
                type="number"
                id="careysTTM"
                name="Total Tooth Material (Carey's Analysis) (Whole Number)"
                step="0.1"
                value={formik.values["Total Tooth Material (Carey's Analysis) (Whole Number)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="careysArchLength" className="block text-sm font-medium text-gray-700">
                Arch Length (mm)
              </label>
              <input
                type="number"
                id="careysArchLength"
                name="Arch Length (Carey's Analysis) (Whole Number)"
                step="0.1"
                value={formik.values["Arch Length (Carey's Analysis) (Whole Number)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      case 'modelArchPerimeter':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="archPerimeterTTM" className="block text-sm font-medium text-gray-700">
                Total Tooth Material (mm)
              </label>
              <input
                type="number"
                id="archPerimeterTTM"
                name="Total Tooth Material (Arch Perimeter Analysis)"
                step="0.1"
                value={formik.values["Total Tooth Material (Arch Perimeter Analysis)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="archPerimeterLength" className="block text-sm font-medium text-gray-700">
                Arch Length (mm)
              </label>
              <input
                type="number"
                id="archPerimeterLength"
                name="Arch Length (Arch Perimeter Analysis) (Whole Number)"
                step="0.1"
                value={formik.values["Arch Length (Arch Perimeter Analysis) (Whole Number)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      case 'modelAshley':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="ashleyTTM" className="block text-sm font-medium text-gray-700">
                Total Tooth Material (mm)
              </label>
              <input
                type="number"
                id="ashleyTTM"
                name="Total Tooth Material (Ashley Howe's)"
                step="0.1"
                value={formik.values["Total Tooth Material (Ashley Howe's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ashleyPremolarDiameter" className="block text-sm font-medium text-gray-700">
                Premolar Diameter (mm)
              </label>
              <input
                type="number"
                id="ashleyPremolarDiameter"
                name="Premolar Diameter (Ashley Howe's)"
                step="0.1"
                value={formik.values["Premolar Diameter (Ashley Howe's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ashleyBasalArchWidth" className="block text-sm font-medium text-gray-700">
                Basal Arch Width (mm)
              </label>
              <input
                type="number"
                id="ashleyBasalArchWidth"
                name="Basal Arch Width (Ashley Howe's)"
                step="0.1"
                value={formik.values["Basal Arch Width (Ashley Howe's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ashleyPMBAW" className="block text-sm font-medium text-gray-700">
                Premolar Basal Arch Width %
              </label>
              <p className="text-xs text-gray-500">
                PMBAW% &lt; 37% = Need for Extraction, PMBAW% ≥ 44% = No extraction required, 37% - 44% = Borderline Case
              </p>
              <input
                type="number"
                id="ashleyPMBAW"
                name="Premolar Basal Arch Width %"
                step="0.1"
                value={formik.values["Premolar Basal Arch Width %"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      case 'modelOthers':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="upperCrowding" className="block text-sm font-medium text-gray-700">
                Crowding in the Upper arch (mm)
              </label>
              <input
                type="number"
                id="upperCrowding"
                name="Crowding in the Upper arch"
                step="0.1"
                value={formik.values["Crowding in the Upper arch"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lowerCrowding" className="block text-sm font-medium text-gray-700">
                Crowding in the Lower arch (mm)
              </label>
              <input
                type="number"
                id="lowerCrowding"
                name="Crowding in the Lower arch"
                step="0.1"
                value={formik.values["Crowding in the Lower arch"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="overbite" className="block text-sm font-medium text-gray-700">
                Overbite (mm)
              </label>
              <p className="text-xs text-gray-500">Normal: 2mm ± 2</p>
              <input
                type="number"
                id="overbite"
                name="Overbite"
                step="0.1"
                value={formik.values["Overbite"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="overjet" className="block text-sm font-medium text-gray-700">
                Overjet (mm)
              </label>
              <p className="text-xs text-gray-500">Normal: 2mm ± 2</p>
              <input
                type="number"
                id="overjet"
                name="Overjet"
                step="0.1"
                value={formik.values["Overjet"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="curveOfSpee" className="block text-sm font-medium text-gray-700">
                Curve of Spee (mm)
              </label>
              <p className="text-xs text-gray-500">Normal: 2-3 mm</p>
              <input
                type="number"
                id="curveOfSpee"
                name="Curve of Spee"
                step="0.1"
                value={formik.values["Curve of Spee"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      case 'hardTissue':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="anb" className="block text-sm font-medium text-gray-700">
                ANB angle (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 2° ± 2</p>
              <input
                type="number"
                id="anb"
                name="ANB angle"
                step="0.1"
                value={formik.values["ANB angle"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="mandibularPlaneAngle" className="block text-sm font-medium text-gray-700">
                Mandibular Plane Angle (Go-Gn to Sn) (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 32° ± 2</p>
              <input
                type="number"
                id="mandibularPlaneAngle"
                name="Mandibular Plane Angle (Go-Gn to Sn)"
                step="0.1"
                value={formik.values["Mandibular Plane Angle (Go-Gn to Sn)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="u1na" className="block text-sm font-medium text-gray-700">
                U1-NA (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 22°</p>
              <input
                type="number"
                id="u1na"
                name="U1-NA"
                step="0.1"
                value={formik.values["U1-NA"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="u1naMm" className="block text-sm font-medium text-gray-700">
                U1-NA (mm)
              </label>
              <p className="text-xs text-gray-500">Normal: 4 mm</p>
              <input
                type="number"
                id="u1naMm"
                name="U1-NA (mm)"
                step="0.1"
                value={formik.values["U1-NA (mm)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="l1nb" className="block text-sm font-medium text-gray-700">
                L1-NB (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 25°</p>
              <input
                type="number"
                id="l1nb"
                name="L1-NB"
                step="0.1"
                value={formik.values["L1-NB"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="l1nbMm" className="block text-sm font-medium text-gray-700">
                L1-NB (mm)
              </label>
              <p className="text-xs text-gray-500">Normal: 4 mm</p>
              <input
                type="number"
                id="l1nbMm"
                name="L1-NB (mm)"
                step="0.1"
                value={formik.values["L1-NB (mm)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="u1sn" className="block text-sm font-medium text-gray-700">
                U1-SN (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 102° ± 2</p>
              <input
                type="number"
                id="u1sn"
                name="U1-SN"
                step="0.1"
                value={formik.values["U1-SN"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="u1pp" className="block text-sm font-medium text-gray-700">
                U1-PP (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 110° ± 5</p>
              <input
                type="number"
                id="u1pp"
                name="U1-PP"
                step="0.1"
                value={formik.values["U1-PP"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      case 'softTissue':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="facialAngle" className="block text-sm font-medium text-gray-700">
                Facial Angle (G-Sn-Pos) (Down) (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 12° ± 4</p>
              <input
                type="number"
                id="facialAngle"
                name="Facial Angle (G-Sn-Pos) (Down)"
                step="0.1"
                value={formik.values["Facial Angle (G-Sn-Pos) (Down)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ulEPlane" className="block text-sm font-medium text-gray-700">
                UL-E Plane (mm) (Rickett's)
              </label>
              <p className="text-xs text-gray-500">Normal: -4 mm</p>
              <input
                type="number"
                id="ulEPlane"
                name="UL-E Plane (mm) (Rickett's)"
                step="0.1"
                value={formik.values["UL-E Plane (mm) (Rickett's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="llEPlane" className="block text-sm font-medium text-gray-700">
                LL-E Plane (mm) (Rickett's)
              </label>
              <p className="text-xs text-gray-500">Normal: -2 mm</p>
              <input
                type="number"
                id="llEPlane"
                name="LL-E Plane (mm) (Rickett's)"
                step="0.1"
                value={formik.values["LL-E Plane (mm) (Rickett's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="zAngle" className="block text-sm font-medium text-gray-700">
                Z Angle (Merrifield) (°)
              </label>
              <p className="text-xs text-gray-500">Normal: 80° ± 9</p>
              <input
                type="number"
                id="zAngle"
                name="Z Angle (Merrifield)"
                step="0.1"
                value={formik.values["Z Angle (Merrifield)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lipStrain" className="block text-sm font-medium text-gray-700">
                Lip Strain (Holdway) (mm)
              </label>
              <input
                type="number"
                id="lipStrain"
                name="Lip Strain (Holdway)"
                step="0.1"
                value={formik.values["Lip Strain (Holdway)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="interlabialGap" className="block text-sm font-medium text-gray-700">
                Interlabial Gap (Stms-Stmi) (Arnett & Bergnett) (mm)
              </label>
              <p className="text-xs text-gray-500">Normal: 2 mm ± 2</p>
              <input
                type="number"
                id="interlabialGap"
                name="Interlabial Gap (Stms-Stmi) (Arnett & Bergnett)"
                step="0.1"
                value={formik.values["Interlabial Gap (Stms-Stmi) (Arnett & Bergnett)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sLineUpperLip" className="block text-sm font-medium text-gray-700">
                S-Line Upper Lip (Steiner's) (mm)
              </label>
              <p className="text-xs text-gray-500">+ Protrusive, - Retrusive</p>
              <input
                type="number"
                id="sLineUpperLip"
                name="S-Line Upper Lip (Steiner's)"
                step="0.1"
                value={formik.values["S-Line Upper Lip (Steiner's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sLineLowerLip" className="block text-sm font-medium text-gray-700">
                S-Line Lower Lip (Steiner's) (mm)
              </label>
              <p className="text-xs text-gray-500">+ Protrusive, - Retrusive</p>
              <input
                type="number"
                id="sLineLowerLip"
                name="S-Line Lower Lip (Steiner's)"
                step="0.1"
                value={formik.values["S-Line Lower Lip (Steiner's)"]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orthodontic Treatment Prediction</h1>
      
      {result ? (
        <div className="mb-6">
          <PredictionResult result={result} />
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Make New Prediction
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">
              Enter Patient Measurements
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the available measurements for the most accurate prediction. Not all fields are required.
            </p>
          </div>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="border-t border-gray-200">
              {/* Tabs */}
              <div className="px-4 sm:px-6">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                          ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }
                        `}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              {/* Form fields based on active tab */}
              <div className="px-4 py-5 sm:p-6">
                {renderFields()}
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Make Prediction'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
