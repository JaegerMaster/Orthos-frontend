import { Link } from 'react-router-dom';

const AboutProject = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              About ORTHOS
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              ORTHOS is an innovative AI-powered system developed to assist orthodontists in making evidence-based decisions for extraction versus non-extraction treatment planning.
            </p>
            <div className="mt-6">
              <Link
                to="/features"
                className="text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Learn more about our features <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="prose prose-blue prose-lg text-gray-500">
              <h3>Research Background</h3>
              <p>
                The ongoing debate between extraction and non-extraction treatment strategies in orthodontics spans over a century, reflecting the evolution of orthodontic philosophies and treatment paradigms. In the early 20th century, treatment approaches predominantly adhered to Angle's Dogma, which emphasized the preservation of all teeth to achieve ideal occlusion.
              </p>
              <p>
                Notably, Tweed's seminal work on mandibular incisor stability presented a compelling argument for the benefits of extraction therapy, highlighting the potential for improved long-term stability and occlusal outcomes. Concurrently, Begg's theory on arch perimeter loss due to interproximal wear in ancestral dentition provided further impetus for considering extraction as a viable treatment option.
              </p>
              <p>
                Despite significant advancements in orthodontic research and technology, the extraction/non-extraction decision remains a complex and multifaceted aspect of treatment planning. Orthodontists must navigate a myriad of factors, including patient-specific considerations, clinical objectives, and biomechanical principles, to determine the most appropriate treatment approach for individual cases.
              </p>
              
              <h3>AI and Orthodontics</h3>
              <p>
                Artificial Intelligence is a groundbreaking concept which is changing the status-quo in every field of our contemporary lives. Leveraging AI technologies, particularly neural networks, orthodontists can harness the power of machine learning algorithms to analyze complex datasets, interpret diagnostic images, and predict treatment outcomes with unprecedented accuracy.
              </p>
              <p>
                The integration of AI into clinical workflows holds promise for streamlining treatment planning processes, optimizing biomechanical considerations, and personalizing treatment approaches to meet the unique needs of individual patients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Team Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Research Team
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Our project is the result of collaborative research at the Buddha Institute of Dental Sciences & Hospital.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12">
                <div className="sm:col-span-2">
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium">
                      <h3>Dr. Sugam Kumar</h3>
                      <p className="text-blue-600">MDS Candidate</p>
                    </div>
                    <div className="text-lg text-gray-500">
                      <p>
                        Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium">
                      <h3>Dr. Amesh Kumar Golwara</h3>
                      <p className="text-blue-600">Professor & HOD</p>
                    </div>
                    <div className="text-lg text-gray-500">
                      <p>
                        Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium">
                      <h3>Dr. Richa Shree</h3>
                      <p className="text-blue-600">Reader</p>
                    </div>
                    <div className="text-lg text-gray-500">
                      <p>
                        Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Technical Approach
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Learn about the artificial neural network architecture and methodology behind ORTHOS.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="prose prose-blue prose-lg text-gray-500">
                <h3>Neural Network Architecture</h3>
                <p>
                  ORTHOS utilizes a sophisticated multi-layer perceptron neural network architecture to analyze orthodontic parameters and generate treatment recommendations. The system processes 24 input parameters derived from photographic analysis, model analysis, and cephalometric measurements.
                </p>
                
                <h3>Training Methodology</h3>
                <p>
                  The neural network is trained on a large dataset of orthodontic cases with known treatment outcomes. The training process involves:
                </p>
                <ul>
                  <li>Data preprocessing and normalization</li>
                  <li>Feature selection and engineering</li>
                  <li>Model training with cross-validation</li>
                  <li>Performance evaluation using accuracy metrics</li>
                  <li>Continuous model improvement through feedback</li>
                </ul>
                
                <h3>Clinical Parameters</h3>
                <p>
                  The system analyzes 24 key orthodontic indices, including:
                </p>
                <ul>
                  <li>Photographic Analysis: Nasolabial Angle (NLA)</li>
                  <li>Model Analysis: Carey's Analysis, Arch Perimeter Analysis, Ashley Howe's Analysis</li>
                  <li>Hard Tissue Cephalometrics: ANB, Go-Gn to SN, U1-NA, L1-NB, etc.</li>
                  <li>Soft Tissue Cephalometrics: Facial Angle, E-Plane Measurements, Z Angle, etc.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
