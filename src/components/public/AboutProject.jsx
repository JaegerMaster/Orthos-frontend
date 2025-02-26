import { Link } from 'react-router-dom';

const AboutProject = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">About ORTHOS</h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
              An AI-powered orthodontic extraction decision support system based on artificial neural networks
            </p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Project Overview
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              ORTHOS is an innovative AI-powered system developed to assist orthodontists in making evidence-based decisions for extraction versus non-extraction treatment planning.
            </p>
            <div className="mt-6">
              <Link
                to="/features"
                className="text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Explore our features <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="prose prose-blue prose-lg text-gray-500">
              <p>
                ORTHOS (Orthodontic Treatment Help and Optimization System) uses artificial neural networks to analyze 24 key orthodontic parameters and provide evidence-based recommendations for extraction versus non-extraction treatment plans.
              </p>
              <p>
                This project was born from the ongoing debate between extraction and non-extraction treatment strategies in orthodontics, which spans over a century. Despite significant advancements in orthodontic research and technology, the extraction/non-extraction decision remains complex and multifaceted, requiring considerations of numerous patient-specific factors.
              </p>
              <p>
                By leveraging artificial intelligence and machine learning algorithms, ORTHOS aims to augment orthodontic decision-making processes, enhance treatment predictability, and optimize outcomes for patients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Background */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Research Background
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                The theoretical foundation of this project draws from decades of orthodontic research and recent advances in artificial intelligence.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="prose prose-blue prose-lg text-gray-500">
                <p>
                  The ongoing debate between extraction and non-extraction treatment strategies in orthodontics spans over a century, reflecting the evolution of orthodontic philosophies and treatment paradigms. In the early 20th century, treatment approaches predominantly adhered to Angle's Dogma, which emphasized the preservation of all teeth to achieve ideal occlusion.
                </p>
                <p>
                  This philosophy faced challenges with the emergence of influential reports in the mid-20th century. Notably, Tweed's seminal work on mandibular incisor stability presented a compelling argument for the benefits of extraction therapy, highlighting the potential for improved long-term stability and occlusal outcomes. Concurrently, Begg's theory on arch perimeter loss due to interproximal wear in ancestral dentition provided further impetus for considering extraction as a viable treatment option.
                </p>
                <p>
                  These pivotal contributions sparked a paradigm shift in orthodontic treatment philosophy, prompting orthodontists to reevaluate the merits of extraction versus non-extraction approaches. Despite significant advancements in orthodontic research and technology, the extraction/non-extraction decision remains a complex and multifaceted aspect of treatment planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI in Orthodontics */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              AI in Orthodontics
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Artificial Intelligence is transforming orthodontic diagnosis and treatment planning.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="prose prose-blue prose-lg text-gray-500">
              <p>
                Artificial Intelligence is a groundbreaking concept which is changing the status-quo in every field of our contemporary lives. The first step in the direction of intelligent machines was taken by Alan Turing, a British mathematician, when he developed the Bombe (with the purpose of deciphering the Enigma code used by the Germans). The word Artificial Intelligence was then officially coined twelve years later, in 1956 by Marvin Minsky and John McCarthy who were computer scientists at Stanford.
              </p>
              <p>
                In orthodontics, AI technologies—particularly neural networks—have been adopted in research settings from 2015 onwards, mainly for analyzing dental radiographs. Leveraging these technologies, orthodontists can harness the power of machine learning algorithms to analyze complex datasets, interpret diagnostic images, and predict treatment outcomes with unprecedented accuracy.
              </p>
              <p>
                The integration of AI into clinical workflows holds promise for streamlining treatment planning processes, optimizing biomechanical considerations, and personalizing treatment approaches to meet the unique needs of individual patients. As AI technologies continue to evolve and mature, orthodontists stand to benefit from enhanced diagnostic accuracy, improved treatment efficiency, and superior patient outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Approach */}
      <div className="bg-gray-50">
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
                  The neural network is trained on a dataset of orthodontic cases with known treatment outcomes. The training process involves:
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

      {/* Study Design & Methodology */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Study Design & Methodology
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Details from the underlying research that powers the ORTHOS system.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="prose prose-blue prose-lg text-gray-500">
              <p>
                The ORTHOS system is based on a simple case-control study conducted at the Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital, Patna. The study included patients between 15-25 years of age with ANB angles between 0°-6° and mandibular plane angles between 28°-35°.
              </p>
              <p>
                The methodology involved collecting data from 480 patients, which was divided into training (450 patients) and test (30 patients) sets. The training set was used to train the neural network, while the test set was used to evaluate its performance. The system was trained to analyze 24 indices from various analyses:
              </p>
              <ul>
                <li>1 from photographic analysis</li>
                <li>7 from model analysis</li>
                <li>8 from hard tissue cephalometry</li>
                <li>8 from soft tissue cephalometry</li>
              </ul>
              <p>
                The system's predictions were compared with orthodontist evaluations to establish its efficacy and correlation. This approach creates an Expert System (ES) that can assist orthodontists in making preliminary decisions regarding extraction or non-extraction treatment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Team */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Research & Development Team
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Meet the team behind the ORTHOS project.
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
                        Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital, Patna, Bihar
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium">
                      <h3>Dr. Amesh Kumar Golwara</h3>
                      <p className="text-blue-600">Professor & HOD (Guide)</p>
                    </div>
                    <div className="text-lg text-gray-500">
                      <p>
                        Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital, Patna, Bihar
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium">
                      <h3>Dr. Richa Shree</h3>
                      <p className="text-blue-600">Reader (Co-Guide)</p>
                    </div>
                    <div className="text-lg text-gray-500">
                      <p>
                        Department of Orthodontics & Dentofacial Orthopedics, Buddha Institute of Dental Sciences & Hospital, Patna, Bihar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 border-t border-gray-200 pt-10 mt-10">
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium">
                      <h3 className="text-xl">Technical Development</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-medium">Sunny Kumar</h4>
                        <p className="text-blue-600">Lead Developer</p>
                        <p className="text-gray-500">Mumbai</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to try ORTHOS?</span>
            <span className="block text-blue-100 text-2xl font-semibold mt-2">Experience the future of orthodontic treatment planning.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/features"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
